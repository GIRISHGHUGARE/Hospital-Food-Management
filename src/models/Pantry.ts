import mongoose, { Document, Schema } from 'mongoose';

interface IPantry extends Document {
    staffName: string;
    contactInfo: string;
    location: string;
}

const pantrySchema = new Schema<IPantry>({
    staffName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
});

const Pantry = mongoose.models.Pantry || mongoose.model<IPantry>('Pantry', pantrySchema);

export default Pantry;
