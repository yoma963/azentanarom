import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth-callback",
    ]
}

export default withAuth