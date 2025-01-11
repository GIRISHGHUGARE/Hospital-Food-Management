import { NextRequest, NextResponse } from 'next/server';

export async function cors(req: NextRequest, res: NextResponse) {
    const allowedOrigins = ['http://localhost:3000', 'https://hospital-food-management-kjlo.onrender.com']; // Add your allowed origins here

    const origin = req.headers.get('origin');

    if (allowedOrigins.includes(origin || '')) {
        res.headers.set('Access-Control-Allow-Origin', origin || '*');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        // Return 200 with no content for preflight request
        return NextResponse.json({}, { status: 200 });
    }

    return res;
}
