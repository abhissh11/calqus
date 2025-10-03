// app/api/interview-progress/[userId]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { InterviewTopic } from "@/models/InterviewTopic";
import { UserTopicProgress } from "@/models/UserTopicProgress";
import { auth } from "../../../../../auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const session = await auth();

    if (!session || (session.user?.id !== userId && !session.user?.isAdmin)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const subjects = await InterviewTopic.aggregate([
        { $group: { _id: "$subject", totalTopics: { $sum: 1 } } },
    ]);

    const progress = await UserTopicProgress.find({ userId });

    const result = subjects.map((subj) => {
        const completedCount = progress.filter(
            (p) => p.completed && p.topicId && p.topicId.toString().startsWith(subj._id)
        ).length;

        return {
            subject: subj._id,
            totalTopics: subj.totalTopics,
            completed: completedCount,
        };
    });

    return NextResponse.json(result);
}
