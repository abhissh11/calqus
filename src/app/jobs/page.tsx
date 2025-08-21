import { BackgroundBeams } from "@/components/ui/background-beams";
import { BriefcaseBusiness, Dot } from "lucide-react";
import React from "react";
import JobBoard from "./job-board";

export default function page() {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col pt-20 px-5 justify-start">
        <div className="flex flex-col items-center justify-center pb-10">
          <div className="flex w-fit items-center mx-auto mb-2 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700 shadow-sm">
            <span className="mr-2 ">
              <BriefcaseBusiness />
            </span>
            Over 400+ jobs added this week
          </div>
          <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 text-center bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-5xl">
            Find Your Next Career Move with
            <br />
            <span className="text-violet-600">Calqus</span> curated jobs
          </h1>
          <p className="text-base max-w-2xl text-gray-600">
            Join hundreds of professionals who have found their dream jobs
            through Calqus curated jobs. With over 2,000 active jobs and global
            opportunities, your next career move is just a click away.
          </p>
        </div>
        <BackgroundBeams />
        <div className="min-h-screen">
          {/* jobs filter and listing of job from here */}
          <JobBoard />
        </div>
      </div>
    </>
  );
}
