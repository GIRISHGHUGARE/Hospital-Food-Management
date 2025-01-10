// src/app/api/patients.ts
import { NextResponse } from 'next/server';
import connectDb from '../../../config/db';
import Patient from '../../../models/Patient';

// GET: Fetch all patients
export async function GET() {
    try {
        await connectDb();
        const patients = await Patient.find();  // Fetch all patients from the database
        return NextResponse.json(patients, { status: 200 });
    } catch {
        return NextResponse.json({ message: 'Failed to fetch patients' }, { status: 500 });
    }
}

// POST: Create a new patient
export async function POST(req: Request) {
    const {
        name,
        diseases,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInfo,
        emergencyContact,
        otherDetails
    } = await req.json();

    // Validate required fields
    if (!name || !roomNumber || !bedNumber || !floorNumber || !age || !gender || !contactInfo || !emergencyContact) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        await connectDb();

        const newPatient = new Patient({
            name,
            diseases,
            allergies,
            roomNumber,
            bedNumber,
            floorNumber,
            age,
            gender,
            contactInfo,
            emergencyContact,
            otherDetails
        });

        await newPatient.save(); // Save the new patient to the database

        return NextResponse.json(newPatient, { status: 201 }); // Return created patient
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to create patient', error: error },
            { status: 500 }
        );
    }
}
// PUT: Update an existing patient
export async function PUT(req: Request) {
    const {
        _id,
        name,
        diseases,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInfo,
        emergencyContact,
        otherDetails
    } = await req.json();

    // Validate required fields
    if (!name || !roomNumber || !bedNumber || !floorNumber || !age || !gender || !contactInfo || !emergencyContact) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        await connectDb();
        const patient = await Patient.findById(_id);  // Find patient by ID

        if (!patient) {
            return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
        }

        // Update patient details
        patient.name = name;
        patient.diseases = diseases;
        patient.allergies = allergies;
        patient.roomNumber = roomNumber;
        patient.bedNumber = bedNumber;
        patient.floorNumber = floorNumber;
        patient.age = age;
        patient.gender = gender;
        patient.contactInfo = contactInfo;
        patient.emergencyContact = emergencyContact;
        patient.otherDetails = otherDetails;

        // Save updated patient
        await patient.save();

        return NextResponse.json(patient, { status: 200 });
    } catch {
        return NextResponse.json({ message: 'Failed to update patient' }, { status: 500 });
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
        const patient = await Patient.findById(id);  // Find patient by ID

        if (!patient) {
            return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
        }

        // Delete the patient
        await Patient.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Patient deleted successfully' }, { status: 200 });
    } catch {
        return NextResponse.json({ message: 'Failed to delete patient' }, { status: 500 });
    }
}
