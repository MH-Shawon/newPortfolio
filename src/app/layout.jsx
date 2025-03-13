import "./globals.css";

export const metadata = {
  title: "Developer Portfolio",
  description: "A showcase of my work and skills as a web developer",
  keywords: [
    "web developer",
    "frontend developer",
    "React developer",
    "Next.js developer",
    "portfolio",
  ],
  icons: {
    icon: [
      { url: "/glasses.jpg", sizes: "32x32" },
      { url: "/glasses.jpg", sizes: "16x16" },
    ],
    apple: [
      { url: "/glasses.jpg", sizes: "180x180" },
    ],
    shortcut: [{ url: "/glasses.jpg" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          type="image/jpeg"
          href="/glasses.jpg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
