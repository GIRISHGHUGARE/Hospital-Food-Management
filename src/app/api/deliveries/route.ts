import { NextResponse } from "next/server";
import connectDb from "../../../config/db";
import Delivery from "../../../models/Delivery";

// GET: Fetch all deliveries
export async function GET() {
    try {
        await connectDb();
        const deliveries = await Delivery.find().populate("patientId"); // Populate patient info
        return NextResponse.json(deliveries, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Failed to fetch deliveries" }, { status: 500 });
    }
}

// POST: Create a new delivery
export async function POST(req: Request) {
    const { patientId, mealBox, deliveryTime, delivered = false, deliveryNotes } = await req.json();

    if (!patientId || !mealBox || !deliveryTime || !deliveryNotes) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        await connectDb();

        const newDelivery = new Delivery({
            patientId,
            mealBox,
            deliveryTime,
            delivered,
            deliveryNotes,
        });

        await newDelivery.save();
        return NextResponse.json(newDelivery, { status: 201 });
    } catch {
        return NextResponse.json({ message: "Failed to create delivery" }, { status: 500 });
    }
}

// PUT: Update an existing delivery
export async function PUT(req: Request) {
    const { id, patientId, mealBox, deliveryTime, delivered, deliveryNotes } = await req.json();

    if (!patientId || !mealBox || !deliveryTime || !deliveryNotes) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        await connectDb();
        const delivery = await Delivery.findById(id);

        if (!delivery) {
            return NextResponse.json({ message: "Delivery not found" }, { status: 404 });
        }

        delivery.patientId = patientId;
        delivery.mealBox = mealBox;
        delivery.deliveryTime = deliveryTime;
        delivery.delivered = delivered;
        delivery.deliveryNotes = deliveryNotes;

        await delivery.save();
        return NextResponse.json(delivery, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Failed to update delivery" }, { status: 500 });
    }
}

// DELETE: Delete a delivery by ID
export async function DELETE(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    try {
        await connectDb();
        const delivery = await Delivery.findById(id);

        if (!delivery) {
            return NextResponse.json({ message: "Delivery not found" }, { status: 404 });
        }

        await Delivery.findByIdAndDelete(id);
        return NextResponse.json({ message: "Delivery deleted successfully" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Failed to delete delivery" }, { status: 500 });
    }
}
