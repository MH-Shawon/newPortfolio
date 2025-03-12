import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                About Me
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Learn more about my background, experience, and what drives me
                as a developer.
              </p>
            </div>
          </div>
        </div>

        <About />

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                Experience
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                My Professional Journey
              </p>
            </div>

            <div className="space-y-12">
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Senior Web Developer
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                    Jan 2020 - Present
                  </div>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Tech Company Inc.
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Led the development of multiple web applications using React,
                  Next.js, and other modern technologies. Collaborated with
                  cross-functional teams to deliver high-quality products on
                  time and within budget.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>
                    Developed and maintained multiple client-facing web
                    applications
                  </li>
                  <li>
                    Implemented responsive designs and ensured cross-browser
                    compatibility
                  </li>
                  <li>Mentored junior developers and conducted code reviews</li>
                  <li>
                    Optimized application performance and improved user
                    experience
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Web Developer
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                    Jun 2017 - Dec 2019
                  </div>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Digital Agency Ltd.
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Worked on various client projects, developing responsive
                  websites and web applications. Collaborated with designers to
                  implement pixel-perfect designs and ensure a seamless user
                  experience.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>
                    Built responsive websites for clients across various
                    industries
                  </li>
                  <li>
                    Implemented front-end functionality using JavaScript and
                    React
                  </li>
                  <li>Integrated third-party APIs and services</li>
                  <li>
                    Participated in client meetings and provided technical
                    consultation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                Education
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Academic Background
              </p>
            </div>

            <div className="space-y-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Bachelor of Science in Computer Science
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                    2013 - 2017
                  </div>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  University of Technology
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Graduated with honors. Specialized in web development and
                  software engineering. Participated in various hackathons and
                  coding competitions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Web Development Bootcamp
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                    2017
                  </div>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Code Academy
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Intensive 12-week program focused on modern web development
                  technologies and practices. Built multiple projects using
                  React, Node.js, and other technologies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
