import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { InterviewTopic } from "@/models/InterviewTopic";
import { auth } from "../../../../../auth";
import mongoose from "mongoose";

// GET → fetch topic by id, topic name, or subject
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;

    let topic;

    // If it's a valid ObjectId, try by _id
    if (mongoose.Types.ObjectId.isValid(id)) {
        topic = await InterviewTopic.findById(id);
    }

    // If not found, try by topic name (case-insensitive)
    if (!topic) {
        topic = await InterviewTopic.findOne({
            topic: new RegExp(`^${id}$`, "i"),
        });
    }

    // If still not found, maybe it's a subject (return all under that subject)
    if (!topic) {
        const topics = await InterviewTopic.find({
            subject: new RegExp(`^${id}$`, "i"),
        });

        if (topics.length === 0) {
            return new NextResponse("Topic not found", { status: 404 });
        }

        return NextResponse.json(topics);
    }

    return NextResponse.json(topic);
}

// UPDATE (Admin only)
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const data = await req.json();

    const updated = await InterviewTopic.findByIdAndUpdate(id, data, {
        new: true,
    });

    if (!updated) return new NextResponse("Topic not found", { status: 404 });
    return NextResponse.json(updated);
}

// DELETE (Admin only)
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const deleted = await InterviewTopic.findByIdAndDelete(id);
    if (!deleted) return new NextResponse("Topic not found", { status: 404 });

    return NextResponse.json({ message: "Topic deleted" });
}
