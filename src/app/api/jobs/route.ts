import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { IJob, Job } from "@/models/job"
import { auth } from "../../../../auth";
import { generateJobSlug } from "@/lib/generateSlug";
import mongoose, { FilterQuery } from "mongoose";

// GET /api/jobs?page=1&jobType=Full Time&experience=2&title=Frontend
export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const skip = (page - 1) * limit;

    const jobType = searchParams.get("jobType");
    const experience = searchParams.get("experience");
    const title = searchParams.get("title");

    // const query: any = {};
    const query: FilterQuery<IJob> = {};

    if (jobType) query.jobType = jobType;
    if (experience) query.experience = { $regex: experience, $options: "i" };
    if (title) query.title = { $regex: title, $options: "i" };

    const jobs = await Job.find(query).sort({ postedAt: -1 }).skip(skip).limit(limit);

    const total = await Job.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ jobs, page, totalPages });
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
        const { title, company, location, jobType, salary, experience, companyLogo, jobDescription, applyLink } =
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
            jobDescription,
            applyLink
        });

        return NextResponse.json(job);
    } catch (err) {
        console.error(err);
        return new NextResponse("Failed to post job", { status: 500 });
    }
}
