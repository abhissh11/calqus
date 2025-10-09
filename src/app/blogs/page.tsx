import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mt-10 sm:mt-10 w-full min-h-screen flex flex-col items-center justify-start">
      {/* Gradient Hero Section */}
      <div
        className="
          relative w-full flex flex-col items-center justify-center text-center overflow-hidden
          h-[80svh] md:h-screen
        "
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
          }}
        />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col gap-3 items-center justify-center px-4">
          <Link href="/">
            <h1 className="mb-6 text-neutral-800 dark:text-neutral-100 text-2xl font-bold flex gap-2 items-center">
              <Image
                src="/images/calqus-logo.png"
                alt="Calqus logo"
                width={36}
                height={36}
                className="rounded-sm"
              />
              Calqus
            </h1>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
            Build Knowledge <br /> <span className="text-pink-500">Code Better</span>
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-xl">
            Actionable insights, tutorials, and interview prep to help you grow as a developer.
          </p>

          <button className="mt-6 bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-950 cursor-pointer flex items-center gap-1 group">
            Get Started Now{" "}
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">
              <ArrowRight size={24} />
            </span>
          </button>
        </div>
      </div>

      {/* Optional: Rest of the page below */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Explore Calqus Blog
        </h2>
        <p className="text-gray-600 max-w-lg">
          Read the latest articles, tutorials, and guides to strengthen your coding journey.
        </p>
        <button className="text-lg font-semibold px-4 py-2 rounded-sm text-white bg-violet-500 hover:bg-violet-600 cursor-pointer">Coming Soon</button>
      </div>
    </div>
  );
}
