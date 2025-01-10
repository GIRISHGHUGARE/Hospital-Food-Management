import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Helper method to initialize middleware
export function initMiddleware(
    middleware: (req: NextApiRequest, res: NextApiResponse, next: (err?: unknown) => void) => void
) {
    return (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: unknown) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve();
            });
        });
}

// Initialize CORS middleware
export const cors = initMiddleware(
    Cors({
        origin: ["http://localhost:3000", "https://hospital-food-management-kjlo.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);
