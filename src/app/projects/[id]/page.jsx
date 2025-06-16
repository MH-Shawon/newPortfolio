import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import config from "@/config";

const fetchProject = async (id) => {
    try {
        const response = await fetch(`${config.apiUrl}/api/projects/${id}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                notFound();
            }
            throw new Error(`Failed to fetch project: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching project:", error);
        notFound();
    }
};

export default async function ProjectDetailPage({ params }) {
    const { id } = params;
    const project = await fetchProject(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/#projects" className="text-indigo-600 dark:text-indigo-400 hover:underline mb-8 inline-block">
                    &larr; Back to Projects
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="relative h-[60vh] w-full">
                        <Image
                            src={project.image || "/assets/placeholder.png"}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{project.title}</h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/80 text-white backdrop-blur-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {project.longDescription && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Detailed Description</h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {project.longDescription}
                                    </p>
                                </div>
                            </div>
                        )}

                        {(project.challenges || project.solutions) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {project.challenges && (
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Challenges</h3>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                                {project.challenges}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {project.solutions && (
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Solutions</h3>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                                {project.solutions}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Links</h3>
                                <div className="flex flex-col space-y-3">
                                    {project.demoLink && (
                                        <Link
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Live Demo
                                        </Link>
                                    )}
                                    {project.codeLink && (
                                        <Link
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/50 dark:hover:bg-indigo-900 transition-colors duration-300"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                            Source Code
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Information</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-medium">Created:</span>{" "}
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </p>
                                    {project.updatedAt && (
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Last Updated:</span>{" "}
                                            {new Date(project.updatedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 