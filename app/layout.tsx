import { Providers } from "@/lib/providers/ReactQueryProvider";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // Your Tailwind CSS file

// Configure Geist (Sans-serif)
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans", // Maps directly to your Tailwind variable
  display: "swap",
});

// Configure JetBrains Mono (Monospace)
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono", // Maps directly to your Tailwind variable
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${jetBrainsMono.variable}`}>
      <head>
        <title>Dev Code</title>
      </head>
      <Providers>
        <body className="bg-background text-on-background selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
          {children}
        </body>
      </Providers>
    </html>
  );
}
