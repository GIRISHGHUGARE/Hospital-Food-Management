// src/app/api/auth.ts
import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../../config/db';
import { cors } from "../../../../lib/initMiddleware";

export async function POST(req: Request) {
    try {
        console.log("Connecting to DB...");
        await connectDb();
        console.log("Applying CORS...");
        const respon = NextResponse.next();
        await cors(req, respon);

        console.log("Parsing request body...");
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email, password are required' },
                { status: 400 }
            );
        }

        console.log("Finding user...");
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        console.log("Comparing passwords...");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        console.log("Generating JWT...");
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json(
            {
                message: 'User login successfully!',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        response.cookies.set("role", user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return response;
    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", details: error },
            { status: 500 }
        );
    }
}

