import Link from "next/link";
import { MoveRight, SendHorizontal } from "lucide-react";
import { notFound } from "next/navigation";

async function getJob(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <main className="max-w-3xl mx-auto flex flex-col gap-1 items-center my-10 py-10 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        {job.company} is hiring for {job.title} | {job.location}
      </h1>

      {/* Badges + Posted Date */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-6 w-full">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 border">
            {job.jobType}
          </span>
          {job.salary && (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 border">
              {job.salary}
            </span>
          )}
          {job.experience && (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800 border">
              {job.experience}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500 ml-auto">
            Posted -{" "}
            {job.postedAt
              ? new Date(job.postedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Recently Posted"}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="w-4/5 h-40 sm:h-54 mb-6">
        <img
          src={job.companyLogo || "/images/tech-office.jpg"}
          alt={job.company}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Job Description */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Job Description</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {job.jobDescription}
        </p>
      </div>

      {/* Apply Button */}

      <Link
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-2 items-center group mt-6 px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg shadow hover:bg-violet-700 transition"
      >
        Apply Now{" "}
        <span>
          <MoveRight className="group-hover:translate-x-1.5 transition delay-75" />
        </span>
      </Link>

      <div className="md:col-span-1 my-10">
        <div className="sticky flex flex-col gap-2 top-28 bg-white dark:bg-neutral-900 shadow rounded-lg p-6 border">
          <div className="border border-gray-400 p-2 rounded-lg flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Join the Premium Group</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 ">
              Referral group is a private group where we share exclusive
              referrals, direct recruiter contacts, Insider openings & more.
              <br /> Everyday 30-40 verified referrals and openings are being
              shared, which you WON'T FIND ANYWHERE.
            </p>
            <Link href="https://t.me/abhishek_dot" target="_blank">
              <button className="group w-fit text-center flex gap-1 items-end px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
                Message to Join
                <span>
                  <SendHorizontal className="group-hover:translate-x-1.5 transition delay-75" />{" "}
                </span>
              </button>
            </Link>
          </div>
          <div className="border border-gray-400 p-2 rounded-lg ">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get jobs and internships posted on Calqus directly delivered to
              your whatsapp inbox.
            </p>
            <button className="w-fit px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
              Join WhatsApp Group
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
