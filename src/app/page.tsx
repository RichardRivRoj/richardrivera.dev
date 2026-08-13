import Image from "next/image";

import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main Contaier */}
      <main className="grow *:flex flex-col items-center justify-center w-full min-h-screen px-4 py-2 mx-auto max-w-7xl">
        {/* Hero Section */}
        <Hero />
        
      </main>
    </>
  );
}
