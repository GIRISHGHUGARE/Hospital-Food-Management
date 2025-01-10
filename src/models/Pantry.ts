import mongoose, { Document, Schema } from "mongoose";
import type { IDelivery } from "./Delivery"; // Type-only import to avoid conflicts

export type IPantry = Document & {
    staffName: string;
    contactInfo: string;
    location: string;
    assignedTasks?: mongoose.Types.ObjectId[] | IDelivery[]; // Supports both ObjectId and populated references
    availability?: boolean;
    shiftTiming?: string;
    role?: "Preparation" | "Inventory" | "Delivery";
};

const pantrySchema = new Schema<IPantry>({
    staffName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, enum: ["Preparation", "Inventory", "Delivery"], required: true },
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }], // References Delivery tasks
    availability: { type: Boolean, default: true },
    shiftTiming: { type: String },
});

const Pantry = mongoose.models.Pantry || mongoose.model<IPantry>("Pantry", pantrySchema);

export default Pantry;
