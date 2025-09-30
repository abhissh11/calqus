import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        // ADD THIS REDIRECT CALLBACK
        redirect: async ({ baseUrl }) => {
            // After a successful action (like sign-in), redirect to the /course page.
            return `${baseUrl}/courses`
        }

    },
    pages: {

        signIn: "/login"
    }
})

