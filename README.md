# Portfolio Website

A modern portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design
- Dark mode support
- Project showcase
- Admin dashboard for managing projects and profile
- Image upload to ImgBB for external hosting

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following content:
   ```
   IMGBB_API_KEY=your_imgbb_api_key
   ```
4. Get an API key from [ImgBB](https://api.imgbb.com/) by creating an account and generating an API key
5. Replace `your_imgbb_api_key` with your actual ImgBB API key
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Image Upload

This portfolio website supports uploading images directly from your local machine to ImgBB for external hosting. This ensures that your images are always available, even if your hosting provider has limitations on storage or bandwidth.

To upload an image:

1. Go to the admin dashboard
2. When adding or editing a project, click on "Upload New Image"
3. Select an image from your local machine
4. The image will be uploaded to ImgBB and the URL will be automatically added to the project

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
- `src/data`: Data models and storage
- `public/assets`: Static assets (images, icons, etc.)

## Technologies Used

- Next.js
- React
- Tailwind CSS
- TypeScript
- ImgBB API for image hosting

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
