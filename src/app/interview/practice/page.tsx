import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
     <div className="mt-5 sm:mt-10 w-full min-h-screen flex flex-col items-center justify-start">
      {/* Gradient Hero Section */}
      <div
        className="
          relative w-full flex flex-col bg-white items-center justify-center text-center overflow-hidden
          h-[80svh] md:h-screen
        "
      >
        {/* Background gradient */}
        

        <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
        `,
      }}
    />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col gap-3 items-center justify-center px-4">
         

          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
            Assess Your Prep <br /> <span className="text-pink-500">Elevate Your Performance </span>
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-xl">
            Simulate real interviews powered by AI — get instant feedback, detailed analytics, and personalized guidance to boost your readiness.
          </p>

          <button className="mt-6 bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-950 cursor-pointer flex items-center gap-1 group">
            Start AI Interview
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">
              <ArrowRight size={24} />
            </span>
          </button>
        </div>
      </div>

      {/* Optional: Rest of the page below */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Explore Calqus Mock AI-Interview
        </h2>
        <p className="text-gray-600 max-w-lg">
          Experience adaptive AI interviews that evaluate your technical, behavioral, and communication skills — practice smarter, perform better.
        </p>
        <button className="mt-4 text-lg font-semibold px-4 py-2 rounded-sm text-white bg-black hover:bg-gray-900 cursor-pointer">Coming Soon</button>
      </div>
    </div>
  
  );
}

<div className="min-h-screen w-full bg-white relative">
    {/* Morning Haze */}
    
    {/* Your Content/Components */}
  </div>
