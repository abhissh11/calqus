import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { auth } from "../../../../auth";
import { generateJobSlug } from "@/lib/generateSlug";
import mongoose from "mongoose";

// GET all jobs
export async function GET() {
    await connectDB();
    const jobs = await Job.find().sort({ postedAt: -1 });
    return NextResponse.json(jobs);
}

// POST (Admin only)
export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await connectDB();
        const body = await req.json();
        const { title, company, location, jobType, salary, experience, companyLogo } =
            body;

        const uniqueId = new mongoose.Types.ObjectId().toString().slice(-6); // short unique
        const slug = generateJobSlug(company, title, jobType, uniqueId);

        const job = await Job.create({
            title,
            company,
            location,
            jobType,
            salary,
            experience,
            companyLogo,
            slug,
        });

        return NextResponse.json(job);
    } catch (err) {
        console.error(err);
        return new NextResponse("Failed to post job", { status: 500 });
    }
}
