import { NextResponse } from "next/server";
import connectDb from "../../../config/db";
import Pantry from "../../../models/Pantry";
import Delivery from "../../../models/Delivery";

// GET: Fetch all pantry staff
export async function GET(req: Request) {
    try {
        await connectDb();
        const pantry = await Pantry.find().populate("assignedTasks"); // Populate tasks
        return NextResponse.json(pantry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch pantry staff" }, { status: 500 });
    }
}

// POST: Create a new pantry staff
export async function POST(req: Request) {
    const {
        staffName,
        contactInfo,
        location,
        availability = true,
        role = "Preparation",
        assignedTasks = [],
    } = await req.json();

    if (!staffName || !contactInfo || !location) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        await connectDb();
        const newPantry = new Pantry({
            staffName,
            contactInfo,
            location,
            availability,
            role,
            assignedTasks,
        });

        await newPantry.save();
        return NextResponse.json(newPantry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create pantry staff", error }, { status: 500 });
    }
}

// PUT: Update an existing pantry staff
export async function PUT(req: Request) {
    const {
        _id,
        staffName,
        contactInfo,
        location,
        availability,
        role,
        assignedTasks = [],
    } = await req.json();

    if (!staffName || !contactInfo || !location) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        await connectDb();
        const pantry = await Pantry.findById(_id);

        if (!pantry) {
            return NextResponse.json({ message: "Pantry staff not found" }, { status: 404 });
        }

        pantry.staffName = staffName;
        pantry.contactInfo = contactInfo;
        pantry.location = location;
        pantry.availability = availability;
        pantry.role = role;
        pantry.assignedTasks = assignedTasks;

        await pantry.save();
        return NextResponse.json(pantry, { status: 200 });
    } catch (error) {
        console.error("Error updating pantry staff:", error);
        return NextResponse.json({ message: "Failed to update pantry staff" }, { status: 500 });
    }
}

// DELETE: Delete a pantry staff by ID
export async function DELETE(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    try {
        await connectDb();
        const pantry = await Pantry.findById(id);

        if (!pantry) {
            return NextResponse.json({ message: "Pantry staff not found" }, { status: 404 });
        }

        // Handle assigned tasks: Unassign them
        await Delivery.updateMany(
            { _id: { $in: pantry.assignedTasks } },
            { $unset: { assignedTo: "" } }
        );

        await Pantry.findByIdAndDelete(id);
        return NextResponse.json({ message: "Pantry staff deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete pantry staff" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const { taskId, newStatus } = await req.json();

    if (!taskId || !newStatus) {
        return NextResponse.json(
            { message: "Task ID and new status are required" },
            { status: 400 }
        );
    }

    try {
        await connectDb();
        const pantry = await Pantry.findOneAndUpdate(
            { "assignedTasks._id": taskId }, // Find the task by ID in assignedTasks
            { $set: { "assignedTasks.$.preparationStatus": newStatus } }, // Update the status
            { new: true } // Return the updated document
        ).populate("assignedTasks");

        if (!pantry) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        const updatedTask = pantry.assignedTasks.find(
            (task: any) => task._id.toString() === taskId
        );
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update task status", error },
            { status: 500 }
        );
    }
}