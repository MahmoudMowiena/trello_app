import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function middleware (req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const requestedPath = req.nextUrl.pathname;

    if (session) {
        if (requestedPath === '/login' || requestedPath === '/register') {
            return NextResponse.redirect(new URL('/home', req.url));
        }
    } else {
        if (requestedPath !== '/login' && requestedPath !== '/register') {
            return NextResponse.rewrite(new URL('/login', req.url));
        }
    }

    return res;
};

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }