// lib/initMiddleware.ts
import Cors from "cors";

// Helper method to initialize middleware
export function initMiddleware(middleware: any) {
    return (req: any, res: any) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: any) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
}

// Initialize CORS middleware
export const cors = initMiddleware(
    Cors({
        origin: ["http://localhost:3000", "https://hospital-food-management.com"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);
