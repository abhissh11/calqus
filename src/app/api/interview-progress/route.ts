import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UserTopicProgress } from "@/models/UserTopicProgress";
import { auth } from "../../../../auth";

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { topicId, status, bookmark } = await req.json();

    if (!topicId) {
        return new NextResponse("Topic ID required", { status: 400 });
    }

    const updated = await UserTopicProgress.findOneAndUpdate(
        { userId: session.user.id, topicId },
        { $set: { status, bookmark } },
        { new: true, upsert: true }
    );

    return NextResponse.json(updated);
}

// GET → fetch all progress for logged-in user
export async function GET() {
    const session = await auth();
    if (!session || !session.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const progress = await UserTopicProgress.find({ userId: session.user.id });
    return NextResponse.json(progress);
}
