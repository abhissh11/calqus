import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Job from "@/models/job";
import { JobCreateSchema } from "@/validations/job";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/jobs  
export async function GET(req: Request) {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");              // "Full Time" | "Internship"
    const experience = searchParams.get("experience");  // e.g. "2" (means >= 2 years)
    const company = searchParams.get("company");
    const domain = searchParams.get("domain");          // e.g. "Frontend Developer"

    const query: any = {};

    if (type) query.type = type;

    if (experience) {
        query.experience = { $gte: Number(experience) };  // >= X years
    }

    if (company) {
        query.company = { $regex: company, $options: "i" };
    }

    if (domain) {
        query.domain = domain; // exact match with dropdown values
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ ok: true, count: jobs.length, jobs });
}

// POST /api/jobs
export async function POST(req: Request) {
    await dbConnect();

    try {
        const json = await req.json();
        const parsed = JobCreateSchema.parse(json);

        const created = await Job.create({
            ...parsed,
            postedAt: new Date(),
        });

        return NextResponse.json({ ok: true, job: created }, { status: 201 });
    } catch (err: any) {
        const message =
            err?.errors?.map?.((e: any) => e.message).join(", ") ||
            err?.message ||
            "Invalid request";

        return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
}
