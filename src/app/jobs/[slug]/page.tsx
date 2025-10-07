import type { Metadata } from "next";
import Link from "next/link";
import { MoveRight, SendHorizontal, Users } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

// Fetch Job Data
async function getJob(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

//  Generate Metadata Dynamically per Job
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Job Not Found | Calqus",
      description: "This job listing could not be found on Calqus.",
    };
  }

  const title = `${job.company} is hiring for ${job.title} | ${job.location}`;
  const description =
    job.jobDescription?.slice(0, 155) ||
    `Apply for ${job.title} at ${job.company}. Explore job details, responsibilities, and apply directly via Calqus.`;
  const canonical = `https://calqus.com/jobs/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [
      job.title,
      job.company,
      `${job.title} job in ${job.location}`,
      "Calqus job listings",
      "apply online",
      "software development jobs",
      "frontend jobs",
      "backend jobs",
      "internship opportunities",
    ],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Calqus",
      type: "article",
      publishedTime: job.postedAt || new Date().toISOString(),
      modifiedTime: job.updatedAt || new Date().toISOString(),
      images: [
        {
          url:
            job.companyLogo ||
            "https://images.unsplash.com/photo-1549757521-4160565ff3de?q=80&w=774&auto=format&fit=crop",
          width: 1200,
          height: 630,
          alt: `${job.company} - ${job.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        job.companyLogo ||
        "https://images.unsplash.com/photo-1549757521-4160565ff3de?q=80&w=774&auto=format&fit=crop",
      ],
    },
  };
}

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

// Main Page
export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <main className="max-w-3xl mx-auto flex flex-col gap-1 items-center my-10 py-10 px-4">
      {/* === JSON-LD STRUCTURED DATA === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: job.jobDescription,
            datePosted: job.postedAt,
            validThrough: job.expiryDate || undefined,
            employmentType: job.jobType,
            hiringOrganization: {
              "@type": "Organization",
              name: job.company,
              logo:
                job.companyLogo ||
                "https://images.unsplash.com/photo-1549757521-4160565ff3de?q=80&w=774&auto=format&fit=crop",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: job.location,
                addressCountry: "India",
              },
            },
            baseSalary: job.salary
              ? {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: {
                  "@type": "QuantitativeValue",
                  value: job.salary.replace(/[^0-9]/g, ""),
                  unitText: "YEAR",
                },
              }
              : undefined,
            applicantLocationRequirements: {
              "@type": "Country",
              name: "India",
            },
            url: `https://calqus.com/jobs/${slug}`,
          }),
        }}
      />

      {/* === Job Header === */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
        {job.company} is hiring for {job.title} | {job.location}
      </h1>

      {/* === Badges + Date === */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-6 w-full">
        <div className="flex items-center gap-2 flex-wrap">
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

      {/* === Company Image === */}
      <div className="w-full sm:w-4/5 h-48 sm:h-56 mb-6 relative">
        <Image
          src={
            job.companyLogo ||
            "https://images.unsplash.com/photo-1549757521-4160565ff3de?q=80&w=774&auto=format&fit=crop"
          }
          alt={`${job.company} logo`}
          width={800}
          height={400}
          className="w-full h-full object-cover rounded-md"
          priority
        />
      </div>

      {/* === Job Description === */}
      <article className="w-full prose prose-violet max-w-none">
        <h2 className="text-xl font-semibold mb-3">Job Description</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {job.jobDescription}
        </p>
      </article>

      {/* === Apply Button === */}
      <Link
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-2 items-center group mt-6 px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg shadow hover:bg-violet-700 transition"
      >
        Apply Now
        <MoveRight className="group-hover:translate-x-1.5 transition delay-75" />
      </Link>

      {/* === Sidebar Promo === */}
      <aside className="md:col-span-1 my-10 w-full">
        <div className="sticky flex flex-col gap-4 top-28 bg-white dark:bg-neutral-900 shadow rounded-lg p-6 border">
          <div className="border border-gray-400 p-3 rounded-lg flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Join the Premium Group</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access private referrals, recruiter contacts, and insider openings.
              30–40 verified jobs shared daily —{" "}
              <span className="text-violet-600">exclusively on Calqus.</span>
            </p>
            <Link href="https://t.me/abhishek_dot" target="_blank">
              <button className="group w-fit flex gap-1 items-center px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
                Message to Join
                <SendHorizontal className="group-hover:translate-x-1.5 transition delay-75" />
              </button>
            </Link>
          </div>

          <div className="border border-gray-400 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get jobs and internships posted on Calqus directly delivered to your
              WhatsApp inbox.
            </p>
            <Link href="https://chat.whatsapp.com/GOmUuEnTvJXCcY3Qbsj8xG?mode=ems_copy_t" target="_blank">
              <button className="w-fit flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
                <Users /> Join WhatsApp Group
              </button>
              </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}
