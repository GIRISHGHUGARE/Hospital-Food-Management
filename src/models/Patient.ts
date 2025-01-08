import mongoose, { Document, Schema } from 'mongoose';

interface IPatient extends Document {
    name: string;
    diseases: string[];
    allergies: string[];
    roomNumber: string;
    bedNumber: string;
    floorNumber: string;
    age: number;
    gender: string;
    contactInfo: string;
    emergencyContact: string;
    otherDetails: string;
}

const patientSchema = new Schema<IPatient>({
    name: { type: String, required: true },
    diseases: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    roomNumber: { type: String, required: true },
    bedNumber: { type: String, required: true },
    floorNumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contactInfo: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    otherDetails: { type: String, default: '' },
});

const Patient = mongoose.models.Patient || mongoose.model<IPatient>('Patient', patientSchema);

export default Patient;
