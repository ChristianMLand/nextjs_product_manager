import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async req => {
    const res = NextResponse.next();
    // make sure to set COOKIE_SECRET in env file, must be at least 32 chars
    const session = await getIronSession(req, res, {
        cookieName: "UserCookie",
        password: process.env.COOKIE_SECRET, 
        cookieOptions: { secure: process.env.NODE_ENV === "production" }
    });

    if (!session.user) return NextResponse.json({ validated: false }, { status: 401 });
    return res;
};

export const config = {
    matcher: ["/api/products/:id*"]
};