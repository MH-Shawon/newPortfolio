"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import ImageSelector from "@/components/ImageSelector";
import config from "@/config";
import toast, { Toaster } from "react-hot-toast";

// Function to fix ImgBB URLs
const fixImgBBUrl = (url) => {
    if (!url) return url;
    if (url.includes("i.ibb.co.com")) {
        return url.replace("i.ibb.co.com", "i.ibb.co");
    }
    if (url.includes("ibb.co.com")) {
        return url.replace("ibb.co.com", "ibb.co");
    }
    return url;
};

export default function AddProjectPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        longDescription: "",
        image: "",
        tags: "",
        demoLink: "",
        codeLink: "",
        featured: false,
        challenges: "",
        solutions: "",
    });

    // Fix image URL when it changes
    useEffect(() => {
        if (formData.image && formData.image.includes("ibb.co")) {
            const fixedUrl = fixImgBBUrl(formData.image);
            if (fixedUrl !== formData.image) {
                setFormData((prev) => ({
                    ...prev,
                    image: fixedUrl,
                }));
            }
        }
    }, [formData.image]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (imagePath) => {
        const fixedImagePath = fixImgBBUrl(imagePath);
        setFormData((prev) => ({
            ...prev,
            image: fixedImagePath,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tagsArray = formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");

            const fixedImage = fixImgBBUrl(formData.image);

            const projectData = {
                ...formData,
                image: fixedImage,
                tags: tagsArray,
            };

            const response = await fetch(`${config.apiUrl}/api/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const newProject = await response.json();

            toast.success(`Project "${newProject.title}" added successfully!`);

            // Redirect to projects page after 2 seconds
            setTimeout(() => {
                router.push("/admin/projects");
            }, 2000);
        } catch (error) {
            toast.error(`Error adding project: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    };

    return (
        <div className="min-h-screen">
            <main className="pt-16">
                <Toaster position="top-right" reverseOrder={false} />
                <div className="py-16 bg-white dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Add New Project
                            </h1>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                                Create a new project for your portfolio.
                            </p>
                        </div>
                    </div>
                </div>

                <section className="py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AdminHeader />

                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Short Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    ></textarea>
                                </div>

                                <div>
                                    <label
                                        htmlFor="longDescription"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Long Description
                                    </label>
                                    <textarea
                                        id="longDescription"
                                        name="longDescription"
                                        value={formData.longDescription}
                                        onChange={handleChange}
                                        rows={6}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    ></textarea>
                                </div>

                                <div>
                                    <label
                                        htmlFor="image"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Image URL *
                                    </label>
                                    <div className="mt-1 flex items-center space-x-4">
                                        <input
                                            type="text"
                                            id="image"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                        />
                                        <ImageSelector onImageSelect={handleImageChange} currentImage={formData.image} />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="tags"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Tags (comma-separated) *
                                    </label>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="demoLink"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Demo Link
                                    </label>
                                    <input
                                        type="url"
                                        id="demoLink"
                                        name="demoLink"
                                        value={formData.demoLink}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="codeLink"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Code Link
                                    </label>
                                    <input
                                        type="url"
                                        id="codeLink"
                                        name="codeLink"
                                        value={formData.codeLink}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="challenges"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Challenges
                                    </label>
                                    <textarea
                                        id="challenges"
                                        name="challenges"
                                        value={formData.challenges}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    ></textarea>
                                </div>

                                <div>
                                    <label
                                        htmlFor="solutions"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Solutions
                                    </label>
                                    <textarea
                                        id="solutions"
                                        name="solutions"
                                        value={formData.solutions}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                    ></textarea>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="featured"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Featured Project
                                    </label>
                                </div>

                                <div className="flex justify-between">
                                    <Link
                                        href="/admin/projects"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
} 