// src/pages/api/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '../../../../config/db';
import { cors } from "../../../../lib/initMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            console.log("Connecting to DB...");
            await connectDb();
            console.log("Applying CORS...");
            await cors(req, res); // assuming the middleware works with NextApiRequest and NextApiResponse

            console.log("Parsing request body...");
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            console.log("Finding user...");
            const user = await User.findOne({ email });
            if (!user) {
                console.log("User not found");
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            console.log("Comparing passwords...");
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log("Password mismatch");
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            console.log("Generating JWT...");
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '1d' }
            );

            // Setting cookies in response
            res.setHeader('Set-Cookie', [
                `token=${token}; HttpOnly; Max-Age=86400; Path=/; SameSite=Strict`,
                `role=${user.role}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict`
            ]);

            // Sending success response
            return res.status(201).json({
                message: 'User logged in successfully!',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            console.error("Login API Error:", error);
            return res.status(500).json({ message: "Internal Server Error", details: error });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
