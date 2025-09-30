import Link from "next/link";

async function getJobs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="max-w-4xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="space-y-4">
        {jobs.map((job: any) => (
          <Link
            key={job._id}
            href={`/jobs/${job.slug}`}
            className="block p-4 border rounded hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
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
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">
                  {job.company} • {job.location} • {job.jobType}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
