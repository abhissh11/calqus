// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    console.log("MIDDLEWARE req.auth:", req.auth);

    // protect all /admin routes
    if (pathname.startsWith("/admin")) {
        //  no auth OR not admin → block
        if (!req.auth) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

    }

    return NextResponse.next();

});
export const config = {
    matcher: ["/admin/:path*"],
};
