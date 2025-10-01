import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { auth } from "../../../../../auth"


// GET single job
export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    await connectDB();

    const { slug } = await params;
    const job = await Job.findOne({ slug });

    if (!job) return new NextResponse("Job not found", { status: 404 });
    return NextResponse.json(job);
}

// UPDATE (Admin only)
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    const body = await req.json();

    const job = await Job.findOneAndUpdate({ slug }, body, { new: true });
    if (!job) return new NextResponse("Job not found", { status: 404 });

    return NextResponse.json(job);
}

// DELETE (Admin only)
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { slug } = await params;

    const job = await Job.findOneAndDelete({ slug });
    if (!job) return new NextResponse("Job not found", { status: 404 });

    return NextResponse.json({ message: "Job deleted" });
}
