// src/app/api/patients.ts
import { NextResponse } from 'next/server';
import connectDb from '../../../config/db';
import Pantry from '../../../models/Pantry';

// GET: Fetch all patients
export async function GET(req: Request) {
    try {
        await connectDb();
        const pantry = await Pantry.find();  // Fetch all patients from the database
        return NextResponse.json(pantry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch pantry' }, { status: 500 });
    }
}

// POST: Create a new patient
export async function POST(req: Request) {
    const {
        staffName,
        contactInfo,
        location,
    } = await req.json();

    // Validate required fields
    if (!staffName || !contactInfo || !location) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const newPantry = new Pantry({
            staffName,
            contactInfo,
            location,
        });

        await newPantry.save(); // Save the new patient to the database

        return NextResponse.json(newPantry, { status: 201 }); // Return created patient
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to create pantry', error: error },
            { status: 500 }
        );
    }
}
// PUT: Update an existing patient
export async function PUT(req: Request) {
    const {
        id,
        staffName,
        contactInfo,
        location,
    } = await req.json();  // Parse the incoming JSON request body

    // Validate required fields
    if (!staffName || !contactInfo || !location) {
        return NextResponse.json(
            { message: 'staffName, contactInfo, location, and condition are required' },
            { status: 400 }
        );
    }

    try {
        await connectDb();
        const pantry = await Pantry.findById(id);  // Find patient by ID

        if (!pantry) {
            return NextResponse.json({ message: 'pantry not found' }, { status: 404 });
        }

        // Update patient details
        pantry.staffName = staffName;
        pantry.contactInfo = contactInfo;
        pantry.location = location;

        // Save updated patient
        await pantry.save();

        return NextResponse.json(pantry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update pantry' }, { status: 500 });
    }
}

// DELETE: Delete a patient by ID
export async function DELETE(req: Request) {
    const { id } = await req.json();  // Parse the incoming JSON request body

    // Validate required fields
    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    try {
        await connectDb();
        const pantry = await Pantry.findById(id);  // Find pantry by ID

        if (!pantry) {
            return NextResponse.json({ message: 'pantry not found' }, { status: 404 });
        }

        // Delete the pantry
        await Pantry.findByIdAndDelete(id);

        return NextResponse.json({ message: 'pantry deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'error to delete pantry' }, { status: 500 });
    }
}