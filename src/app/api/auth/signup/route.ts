// src/app/api/auth.ts
import { NextResponse, NextRequest } from 'next/server';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../../config/db';
import { cors } from '../../../../lib/initMiddleware';

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const res = NextResponse.next(); // Creating a response object for CORS to work
        await cors(req, res);
        const { email, password, role } = await req.json();

        // Validate required fields
        if (!email || !password || !role) {
            return NextResponse.json(
                { message: 'Email, password, and role are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        // Generate JWT token for the new user
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' } // Token expires in 1 day
        );
        const response = NextResponse.json(
            {
                message: 'User created successfully!',
                token,
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: 201 }
        );
        response.cookies.set("token", token, ({
            httpOnly: true
        }))
        response.cookies.set("role", newUser.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return response;

    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}

