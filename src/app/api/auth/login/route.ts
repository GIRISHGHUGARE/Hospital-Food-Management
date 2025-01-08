// src/app/api/auth.ts
import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../../config/db';

export async function POST(req: Request) {
    await connectDb();

    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
        return NextResponse.json(
            { message: 'Email, password are required' },
            { status: 400 }
        );
    }

    // Check if user already exists
    const user = await User.findOne({ email });

    // Hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }

    // Generate JWT token for the  user
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' } // Token expires in 1 day
    );

    return NextResponse.json(
        {
            message: 'User login successfully!',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        },
        { status: 201 }
    );
}

