// src/app/api/patients.ts
import { NextResponse } from 'next/server';
import connectDb from '../../../config/db';
import FoodChart from '../../../models/FoodChart';

// GET: Fetch all patients
export async function GET(req: Request) {
    try {
        await connectDb();
        const foodCharts = await FoodChart.find();
        return NextResponse.json(foodCharts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch foodCharts' }, { status: 500 });
    }
}

// POST: Create a new patient
export async function POST(req: Request) {
    const {
        patientId,
        morningMeal,
        eveningMeal,
        nightMeal,
        instructions,
        ingredients
    } = await req.json();

    // Validate required fields
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal || !instructions || !ingredients) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const newFoodChart = new FoodChart({
            patientId,
            morningMeal,
            eveningMeal,
            nightMeal,
            instructions,
            ingredients
        });

        await newFoodChart.save(); // Save the new patient to the database

        return NextResponse.json(newFoodChart, { status: 201 }); // Return created patient
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to create foodCharts', error: error },
            { status: 500 }
        );
    }
}
// PUT: Update an existing patient
export async function PUT(req: Request) {
    const {
        _id,
        patientId,
        morningMeal,
        eveningMeal,
        nightMeal,
        instructions,
        ingredients
    } = await req.json();  // Parse the incoming JSON request body

    // Validate required fields
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal || !instructions || !ingredients) {
        return NextResponse.json(
            { message: 'patientId, morningMeal, eveningMeal, nightMeal and instructions are required' },
            { status: 400 }
        );
    }

    try {
        await connectDb();
        const foodCharts = await FoodChart.findById(_id);  // Find patient by ID

        if (!foodCharts) {
            return NextResponse.json({ message: 'delivery not found' }, { status: 404 });
        }

        // Update patient details
        foodCharts.patientId = patientId;
        foodCharts.morningMeal = morningMeal;
        foodCharts.eveningMeal = eveningMeal;
        foodCharts.nightMeal = nightMeal;
        foodCharts.instructions = instructions;
        foodCharts.ingredients = ingredients;

        // Save updated foodCharts
        await foodCharts.save();

        return NextResponse.json(foodCharts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update foodCharts' }, { status: 500 });
    }
}

// DELETE: Delete a foodCharts by ID
export async function DELETE(req: Request) {
    const { id } = await req.json();  // Parse the incoming JSON request body

    // Validate required fields
    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    try {
        await connectDb();
        const foodCharts = await FoodChart.findById(id);

        if (!foodCharts) {
            return NextResponse.json({ message: 'foodCharts not found' }, { status: 404 });
        }

        // Delete the delivery
        await FoodChart.findByIdAndDelete(id);

        return NextResponse.json({ message: 'foodCharts deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'error to delete foodCharts' }, { status: 500 });
    }
}