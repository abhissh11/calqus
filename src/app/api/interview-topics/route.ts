import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { InterviewTopic } from "@/models/InterviewTopic";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { subject, topic, videoRef, blog } = await req.json();

    if (!subject || !topic) {
        return new NextResponse("Subject and Topic are required", { status: 400 });
    }

    const newTopic = await InterviewTopic.create({
        subject,
        topic,
        videoRef,
        blog,
    });

    return NextResponse.json(newTopic);
}

//get
export async function GET() {
    await connectDB();
    const topics = await InterviewTopic.find({});
    return NextResponse.json(topics);
}