import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'pantry' | 'delivery';
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'pantry', 'delivery'] },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
