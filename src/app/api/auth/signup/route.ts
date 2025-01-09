// src/app/api/auth.ts
import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../../config/db';

export async function POST(req: Request) {
    try {
        await connectDb();

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
        return response;

    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}

