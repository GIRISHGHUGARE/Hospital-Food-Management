// src/app/api/auth.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const response = NextResponse.json(
            {
                success: true,
                mesage: "Logout successfully"
            },
            { status: 200 }
        );
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        response.cookies.set("role", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}

