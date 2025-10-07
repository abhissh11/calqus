import Link from "next/link";
import { cn } from "@/lib/utils";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Explore from "./sections/Explore";
import { CalqusCTA } from "./sections/CTA";
import BookCallModalClient from "./sections/BookCallModalClient"; 
import HeroAnnouncement from "../components/HeroAnnouncement";

export default function Home() {
  return (
    <main>
      <section className="relative flex flex-col items-center justify-center h-fit mt-20 md:mt-0 md:min-h-screen bg-white text-center overflow-hidden px-6 dark:bg-black">
        {/* === Background Grid === */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="z-10 max-w-3xl">
          <HeroAnnouncement />

          {/* Headline */}
          <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-6xl">
            Where Bold Ideas Meet Seamless Execution.
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Calqus crafts web and app solutions designed to attract, engage, and
            convert — so your business can grow faster, smarter, and stronger.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BookCallModalClient />

            <Link
              href="#explore"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Explore Jobs & Courses
            </Link>
          </div>
        </div>
      </section>

      {/* === Other Sections  === */}
      <Services />
      <WhyChooseUs />
      <Explore />
      <CalqusCTA />
    </main>
  );
}
