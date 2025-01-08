// src/app/api/patients.ts
import { NextResponse } from 'next/server';
import connectDb from '../../../config/db';
import Delivery from '../../../models/Delivery';

// GET: Fetch all patients
export async function GET(req: Request) {
    try {
        await connectDb();
        const delivery = await Delivery.find();  // Fetch all patients from the database
        return NextResponse.json(delivery, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch delivery' }, { status: 500 });
    }
}

// POST: Create a new patient
export async function POST(req: Request) {
    const {
        patientId,
        mealBox,
        deliveryTime,
        delivered,
        deliveryNotes
    } = await req.json();

    // Validate required fields
    if (!patientId || !mealBox || !deliveryTime || delivered || deliveryNotes) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const newDelivery = new Delivery({
            patientId,
            mealBox,
            deliveryTime,
            delivered,
            deliveryNotes
        });

        await newDelivery.save(); // Save the new patient to the database

        return NextResponse.json(newDelivery, { status: 201 }); // Return created patient
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to create delivery', error: error },
            { status: 500 }
        );
    }
}
// PUT: Update an existing patient
export async function PUT(req: Request) {
    const {
        id,
        patientId,
        mealBox,
        deliveryTime,
        delivered,
        deliveryNotes
    } = await req.json();  // Parse the incoming JSON request body

    // Validate required fields
    if (!patientId || !mealBox || !deliveryTime || delivered || deliveryNotes) {
        return NextResponse.json(
            { message: 'patientId, mealBox, deliveryTime, delivered and deliveryNotes are required' },
            { status: 400 }
        );
    }

    try {
        await connectDb();
        const delivery = await Delivery.findById(id);  // Find patient by ID

        if (!delivery) {
            return NextResponse.json({ message: 'delivery not found' }, { status: 404 });
        }

        // Update patient details
        delivery.patientId = patientId;
        delivery.mealBox = mealBox;
        delivery.deliveryTime = deliveryTime;
        delivery.delivered = delivered;
        delivery.deliveryNotes = deliveryNotes;

        // Save updated patient
        await delivery.save();

        return NextResponse.json(delivery, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update delivery' }, { status: 500 });
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
        const delivery = await Delivery.findById(id);

        if (!delivery) {
            return NextResponse.json({ message: 'delivery not found' }, { status: 404 });
        }

        // Delete the delivery
        await Delivery.findByIdAndDelete(id);

        return NextResponse.json({ message: 'delivery deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'error to delete delivery' }, { status: 500 });
    }
}