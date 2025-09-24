import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Job from "@/models/job"
import mongoose from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
    await dbConnect();
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
    }

    const job = await Job.findById(id).lean();
    if (!job) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, job });
}
