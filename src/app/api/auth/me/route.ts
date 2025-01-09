// src/app/api/auth.ts
import { NextResponse, NextRequest } from 'next/server';
import User from '../../../../models/User';
import { getDataFromToken } from '@/helpers/getDataFromToken';

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
        }
        return NextResponse.json(
            {
                message: 'User found successfully!',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}

