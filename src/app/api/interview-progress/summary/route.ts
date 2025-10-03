import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UserTopicProgress } from "@/models/UserTopicProgress";
import { InterviewTopic } from "@/models/InterviewTopic";
import { auth } from "../../../../../auth";
import mongoose from "mongoose";

export async function GET() {
    const session = await auth();
    if (!session || !session.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    // Get all topics
    const topics = await InterviewTopic.find({});
    const progress = await UserTopicProgress.find({
        userId: new mongoose.Types.ObjectId(session.user.id),
    });

    // Group progress per subject
    const summary: Record<string, { total: number; completed: number }> = {};

    topics.forEach((t) => {
        const subj = t.subject;
        if (!summary[subj]) {
            summary[subj] = { total: 0, completed: 0 };
        }
        summary[subj].total += 1;

        const prog = progress.find((p) => p.topicId.toString() === t._id.toString());
        if (prog?.status) {
            summary[subj].completed += 1;
        }
    });

    return NextResponse.json(summary);
}
