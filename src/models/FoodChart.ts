import mongoose, { Document, Schema } from 'mongoose';

interface IFoodChart extends Document {
    patientId: mongoose.Types.ObjectId;
    morningMeal: string;
    eveningMeal: string;
    nightMeal: string;
    instructions: string[];
    ingredients: string[];
}

const foodChartSchema = new Schema<IFoodChart>({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    morningMeal: { type: String, required: true },
    eveningMeal: { type: String, required: true },
    nightMeal: { type: String, required: true },
    instructions: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },
});

const FoodChart = mongoose.models.FoodChart || mongoose.model<IFoodChart>('FoodChart', foodChartSchema);

export default FoodChart;
