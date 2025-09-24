interface JobCardProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location?: string;
    type: string;
    experience: string;
    salary: string;
    postedAt: string;
    image?: string; // optional company/job image
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex pb-2 border-b-2 overflow-hidden  hover:shadow-md transition bg-white">
      {/* Left: Image */}
      <div className="w-40 h-32 flex-shrink-0">
        <img
          src={
            job.image || "/images/tech-office.jpg" // fallback
          }
          alt={job.company}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right: Content */}
      <div className="flex-1 px-4">
        <h2 className="text-xl font-semibold">
          {job.company} is hiring for {job.title}
          {job.location ? ` | ${job.location}` : ""}
        </h2>

        {/* Meta: Admin + Date */}
        <p className="text-sm text-gray-500">
          Posted on: {new Date(job.postedAt).toLocaleDateString()}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-900">
            {job.type}
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-900">
            {job.salary}
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-900">
            {job.experience}
          </span>
        </div>
      </div>
    </div>
  );
}
