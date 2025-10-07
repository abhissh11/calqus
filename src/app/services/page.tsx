import type { Metadata } from "next";
import Services from "../sections/Services";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calqus Services | Web, App & AI Development Solutions",
  description:
    "Discover Calqus end-to-end services — Web Development, App Design, AI Chatbots, Custom AI Solutions, and Full-Stack Development tailored for modern businesses.",
  keywords: [
    "web development services",
    "app development",
    "AI chatbot development",
    "AI solutions for business",
    "Next.js development",
    "fullstack web development",
    "custom software development",
    "Calqus services",
  ],
  alternates: {
    canonical: "https://calqus.com/services",
  },
  openGraph: {
    title: "Calqus Services | Modern Web, App & AI Solutions",
    description:
      "From Web and App Development to AI-powered automation — Calqus delivers intelligent, scalable, and elegant tech solutions for startups and enterprises.",
    url: "https://calqus.com/services",
    siteName: "Calqus",
    type: "website",
    images: [
      {
        url: "https://calqus.com/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Calqus Software and AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqus Services | Web, App & AI Development Experts",
    description:
      "Explore AI Chatbots, Web Apps, Fullstack Solutions, and Intelligent Software tailored for your business by Calqus.",
    images: ["https://calqus.com/og-services.jpg"],
  },
};

export default function ServicesPage() {
  // For SEO structured data (Service schema)
  const servicesList = [
    {
      name: "Web Design & Development",
      description:
        "Responsive and modern websites built using Next.js, React, and Tailwind CSS — optimized for performance and SEO.",
    },
    {
      name: "App Development",
      description:
        "Cross-platform mobile app development for iOS and Android using React Native and Flutter.",
    },
    {
      name: "Fullstack Web App Development",
      description:
        "End-to-end web applications with secure backends, REST/GraphQL APIs, and cloud integration.",
    },
    {
      name: "AI Chatbot Development",
      description:
        "Build intelligent conversational AI chatbots for customer support, e-commerce, and lead generation using GPT and NLP models.",
    },
    {
      name: "AI-Powered Business Solutions",
      description:
        "Integrate custom AI solutions such as recommendation systems, data analytics automation, and workflow optimization.",
    },
    {
      name: "UI/UX Design",
      description:
        "Design seamless, user-centric interfaces that align with brand identity and enhance digital experiences.",
    },
  ];

  return (
    <div className="px-6 md:px-20 min-h-screen py-20">
      {/* === Structured Data for Services === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Calqus Services",
            description:
              "Explore Calqus web, app, and AI development services crafted to help startups and enterprises scale efficiently.",
            itemListElement: servicesList.map((service, index) => ({
              "@type": "Service",
              position: index + 1,
              name: service.name,
              description: service.description,
              provider: {
                "@type": "Organization",
                name: "Calqus",
                url: "https://calqus.com",
              },
            })),
          }),
        }}
      />

      {/* === SEO Heading & Intro === */}
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-violet-700 mb-4">
          Calqus Software & AI Development Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We deliver cutting-edge digital solutions - from stunning websites and
          fullstack apps to AI-powered systems - that help your business scale
          smarter and faster.
        </p>
      </header>

      {/* === Main Services Section === */}
      <Services />

      {/* === Additional AI Services Section === */}
      <section className="mt-6">
        <h2 className="text-3xl font-semibold text-violet-700 mb-6 text-center">
          Our Advanced AI & Automation Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList
            .filter(
              (s) =>
                s.name.includes("AI") ||
                s.name.includes("Automation") ||
                s.name.includes("Chatbot")
            )
            .map((service) => (
              <div
                key={service.name}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
        </div>
      </section>

      {/* === CTA === */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          Have a project in mind?
        </h2>
        <p className="text-gray-600 mb-6">
          Let’s bring your idea to life — whether it’s a web app, mobile app, or
          custom AI solution.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700 transition"
        >
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}
