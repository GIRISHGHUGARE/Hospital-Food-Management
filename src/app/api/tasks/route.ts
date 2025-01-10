import { NextResponse } from "next/server";
import connectDb from "../../../config/db";
import Pantry from "../../../models/Pantry";
import Delivery from "../../../models/Delivery";
import { IPantry } from "../../../models/Pantry";
import { IDelivery } from "../../../models/Delivery";

export async function GET(req: Request) {
    try {
        await connectDb();

        // Fetch all pantry staff with their assigned delivery tasks
        const pantryStaff = await Pantry.find({ role: "Preparation" }).populate<{
            assignedTasks: IDelivery[];
        }>("assignedTasks");

        // Extract tasks with necessary details
        const tasks = pantryStaff.flatMap((staff) =>
            staff.assignedTasks.map((task) => ({
                _id: task._id.toString(), // Ensure _id is string
                mealBox: task.mealBox,
                preparationStatus: task.preparationStatus,
                assignedTo: staff.staffName, // Explicitly typed in IPantry
            }))
        );

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ message: "Failed to fetch tasks." }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const { taskId, newStatus } = await req.json();

    try {
        await connectDb();

        // Find the task in the Delivery model
        const task = await Delivery.findById(taskId);

        if (!task) {
            return NextResponse.json({ message: "Task not found." }, { status: 404 });
        }

        // Update the preparationStatus
        task.preparationStatus = newStatus;
        await task.save();

        return NextResponse.json({ message: "Task status updated." }, { status: 200 });
    } catch (error) {
        console.error("Error updating task status:", error);
        return NextResponse.json({ message: "Failed to update task status." }, { status: 500 });
    }
}
