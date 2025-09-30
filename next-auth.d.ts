// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            isAdmin?: boolean; // 👈 add custom property
        } & DefaultSession["user"];
    }
}
