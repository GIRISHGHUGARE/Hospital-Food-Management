import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "../../../../config/db";
import { cors } from "../../../../lib/initMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb();
    await cors(req, res);

    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email, password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        res.setHeader("Set-Cookie", [
            `token=${token}; HttpOnly; Path=/; Max-Age=86400`,
            `role=${user.role}; HttpOnly; Secure; SameSite=Strict; Path=/;`,
        ]);

        res.status(201).json({
            message: "User login successfully!",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}
