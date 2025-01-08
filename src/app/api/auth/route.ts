// src/app/api/auth.ts
import { NextResponse } from 'next/server';
import User from '../../../models/User'; // Assuming the User model is in the models folder
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../config/db';

export async function POST(req: Request) {
    await connectDb();

    const { email, password, role } = await req.json(); // `req.json()` is used to parse JSON in Next.js 13 API routes

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

    // Save user to DB
    await newUser.save();

    // Generate JWT token for the new user
    const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' } // Token expires in 1 day
    );

    // Send the token and user information back
    return NextResponse.json(
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
}

