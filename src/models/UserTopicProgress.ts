import mongoose, { Schema, Document } from "mongoose";

export interface IUserTopicProgress extends Document {
    userId: mongoose.Types.ObjectId;
    topicId: mongoose.Types.ObjectId;
    status: boolean;
    bookmark: boolean;
}

const UserTopicProgressSchema = new Schema<IUserTopicProgress>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        topicId: { type: Schema.Types.ObjectId, ref: "InterviewTopic", required: true },
        status: { type: Boolean, default: false },
        bookmark: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const UserTopicProgress =
    mongoose.models.UserTopicProgress ||
    mongoose.model<IUserTopicProgress>("UserTopicProgress", UserTopicProgressSchema);
