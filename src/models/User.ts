import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
    id: Types.ObjectId,
    name: string;
    email: string;
    image?: string;
    isAdmin: boolean;
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
