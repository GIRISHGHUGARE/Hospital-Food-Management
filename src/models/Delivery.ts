import mongoose, { Document, Schema } from 'mongoose';

interface IDelivery extends Document {
    patientId: mongoose.Types.ObjectId;
    mealBox: string;
    deliveryTime: Date;
    delivered: boolean;
    deliveryNotes: string;
}

const deliverySchema = new Schema<IDelivery>({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    mealBox: { type: String, required: true },
    deliveryTime: { type: Date, required: true },
    delivered: { type: Boolean, default: false },
    deliveryNotes: { type: String, default: '' },
});

const Delivery = mongoose.models.Delivery || mongoose.model<IDelivery>('Delivery', deliverySchema);

export default Delivery;
