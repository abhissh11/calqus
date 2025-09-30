import { notFound } from "next/navigation";

interface JobProps {
  params: Promise<{ slug: string }>;
}

async function getJob(slug: string) {
  console.log(slug);
  const res = await fetch(`http://localhost:3000/api/jobs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function JobPage({ params }: JobProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-20 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-16 h-16 rounded object-cover"
          />
        ) : (
          <img
            src="/images/tech-office.jpg"
            alt={job.company}
            className="w-16 h-16 rounded object-cover"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600">
            {job.company} • {job.location} • {job.jobType}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>Experience:</strong> {job.experience}
        </p>
        <p>
          <strong>Posted:</strong> {new Date(job.postedAt).toDateString()}
        </p>
      </div>
    </main>
  );
}
