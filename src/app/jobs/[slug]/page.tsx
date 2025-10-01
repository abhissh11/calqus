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
    <main className="max-w-3xl mx-auto my-10 py-10">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.company} • {job.location} • {job.jobType}
      </p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Posted:</strong> {new Date(job.postedAt).toDateString()}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="whitespace-pre-line text-gray-700">{job.jobDescription}</p>
      </div>

      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
      >
        Apply Now
      </a>
    </main>
  );
}
