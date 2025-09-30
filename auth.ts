import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import mongoose from 'mongoose';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user }) {
            await connectDB();

            const normalizedEmail = user.email?.toLowerCase() ?? "";
            let dbUser = await User.findOne({ email: normalizedEmail });

            if (!dbUser) {
                dbUser = await User.create({
                    name: user.name,
                    email: normalizedEmail,
                    image: user.image,
                    isAdmin: ADMIN_EMAILS.includes(normalizedEmail),
                });
            } else {
                dbUser.name = user.name || dbUser.name;
                dbUser.image = user.image || dbUser.image;
                if (ADMIN_EMAILS.includes(normalizedEmail)) {
                    dbUser.isAdmin = true;
                }
                await dbUser.save();
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user?.email) {
                await connectDB();
                const dbUser = await User.findOne({ email: user.email.toLowerCase() });
                if (dbUser) {
                    token.isAdmin = dbUser.isAdmin;
                    token.id = (dbUser._id as mongoose.Types.ObjectId).toString(); // no cast needed
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).isAdmin = token.isAdmin as boolean;
            }
            return session;
        },

        redirect: async ({ baseUrl }) => {
            return `${baseUrl}/courses`;
        },
    },
    pages: {
        signIn: "/login",
    },
});
