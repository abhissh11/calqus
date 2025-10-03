import mongoose, { Schema, Document } from "mongoose";

export interface IInterviewTopic extends Document {
    subject: string;
    topic: string;
    videoRef?: string;
    blog?: string;
}

const InterviewTopicSchema = new Schema<IInterviewTopic>(
    {
        subject: { type: String, required: true },
        topic: { type: String, required: true },
        videoRef: { type: String },
        blog: { type: String },
    },
    { timestamps: true }
);

export const InterviewTopic =
    mongoose.models.InterviewTopic ||
    mongoose.model<IInterviewTopic>("InterviewTopic", InterviewTopicSchema);
