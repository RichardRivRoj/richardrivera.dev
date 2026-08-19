import Image from "next/image";

import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { TechStack } from "./components/TechStack";
import { FeaturedProjects } from "./components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main Contaier */}
      <main className="grow *:flex flex-col items-center justify-center w-full min-h-screen px-4 py-2 mx-auto max-w-7xl">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Experience Timeline Section */}
        <ExperienceTimeline />

        {/* Tech Stack Section */}
        <TechStack />

        {/* Projects Section */}
        <FeaturedProjects />
        
      </main>
    </>
  );
}
