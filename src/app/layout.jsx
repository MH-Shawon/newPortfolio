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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
