import Image from "next/image";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Explore from "./sections/Explore";
import { CalqusCTA } from "./sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Explore />
      <CalqusCTA />
    </main>
  );
}
