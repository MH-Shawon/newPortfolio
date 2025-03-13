import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Contact Me
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Have a project in mind or want to discuss a potential
                collaboration? I&apos;d love to hear from you!
              </p>
            </div>
          </div>
        </div>

        <Contact />

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                FAQ
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Frequently Asked Questions
              </p>
            </div>

            <div className="mt-12 space-y-8">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  What services do you offer?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I offer a range of web development services including frontend
                  development, full-stack development, responsive design,
                  performance optimization, and technical consultation. My
                  expertise includes React, Next.js, TypeScript, and modern CSS
                  frameworks like Tailwind CSS.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  How much do you charge for a website?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Project costs vary depending on complexity, features, and
                  timeline. I provide detailed quotes after understanding your
                  specific requirements. For an accurate estimate, please reach
                  out with details about your project, and I'll be happy to
                  discuss pricing options.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  What is your typical process for working with a new client?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  My process typically includes an initial consultation to
                  understand your needs, followed by a proposal outlining scope,
                  timeline, and cost. Once approved, I move to design and
                  development phases with regular check-ins and feedback
                  sessions. After launch, I provide support and maintenance as
                  needed.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  How long does it take to complete a project?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Project timelines depend on scope and complexity. A simple
                  website might take 2-4 weeks, while more complex applications
                  can take several months. I&apos;ll provide a realistic
                  timeline during our initial discussions and keep you updated
                  throughout the development process.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Do you provide ongoing maintenance and support?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, I offer ongoing maintenance and support services to
                  ensure your website or application continues to run smoothly.
                  This can include regular updates, security patches,
                  performance optimization, and feature enhancements. We can
                  discuss a maintenance plan that suits your needs.
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
