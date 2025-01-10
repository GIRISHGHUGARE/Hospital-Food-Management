import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string; // Adjust based on your token payload
    [key: string]: unknown; // Use `unknown` instead of `any` for additional properties
}

export const getDataFromToken = (req: NextRequest): string | NextResponse => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        return decodedToken.userId;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
};
