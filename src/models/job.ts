import mongoose, { Schema, Model, Types } from "mongoose";

export interface IJob {
    _id: Types.ObjectId;
    companyLogo: string;
    title: string;
    company: string;
    location: string;
    postedAt: Date;
    jobType: "Full Time" | "Part Time" | "Internship" | "Contract";
    salary: string;
    experience: string;
    slug: string;
    jobDescription: string;
    applyLink: string;
}

const JobSchema = new Schema<IJob>({
    companyLogo: {
        type: String,
        default:
            "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop",
    },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: "" },
    postedAt: { type: Date, default: Date.now },
    jobType: {
        type: String,
        enum: ["Full Time", "Part Time", "Internship", "Contract"],
        required: true,
    },
    salary: { type: String, required: true },
    experience: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    jobDescription: { type: String, required: true },
    applyLink: { type: String, required: true }
});

export const Job: Model<IJob> =
    mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
