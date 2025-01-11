// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cors } from '../../../../lib/initMiddleware';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../../config/db';

export async function POST(req: NextRequest) {
    try {
        // Apply CORS middleware
        const res = NextResponse.next(); // Creating a response object for CORS to work
        await cors(req, res);

        await connectDb();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        // Set cookies in the response
        const response = NextResponse.json({
            message: 'User logged in successfully!',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        }, { status: 201 });

        // Setting cookies with HttpOnly flag
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 86400 * 1000, // 1 day
            path: '/',
            sameSite: 'strict',
        });
        response.cookies.set('role', user.role, {
            httpOnly: true,
            sameSite: 'strict',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", details: error }, { status: 500 });
    }
}
