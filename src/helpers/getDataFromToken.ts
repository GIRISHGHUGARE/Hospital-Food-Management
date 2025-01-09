// src/app/api/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
        return decodedToken.userId;
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}

