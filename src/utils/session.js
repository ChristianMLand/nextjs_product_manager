import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
// simple wrapper that provides the session to routes
// make sure to set COOKIE_SECRET in env file, must be at least 32 chars
export const ironOptions = {
    cookieName: "UserCookie",
    password: process.env.COOKIE_SECRET,
    cookieOptions: { secure: process.env.NODE_ENV === "production" }
}
export const withSessionRoute = handler => withIronSessionApiRoute(handler, ironOptions);

export const withSessionSsr = handler => withIronSessionSsr(handler, ironOptions);