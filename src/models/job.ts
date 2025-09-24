import mongoose, { model, models, Schema } from "mongoose"

const JobSchema = new Schema(
    {
        companyLogo: { type: String, default: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
    },
    { timestamps: true }
);

export default models.Job || model("Job", JobSchema)