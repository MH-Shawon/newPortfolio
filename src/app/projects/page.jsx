"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Projects showAll={true} />
      </main>
      <Footer />
    </div>
  );
}
