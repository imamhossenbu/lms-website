import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const aeonik = localFont({
  src: [
    { path: "./fonts/Aeonik-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Aeonik-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Aeonik-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Aeonik-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

const DESCRIPTION = "EduPro is the all-in-one LMS for schools, coaching centres and training institutes: courses, live classes, quizzes, certificates and payments in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "EduPro — Run your academy online", template: "%s · EduPro" },
  description: DESCRIPTION,
  applicationName: "EduPro",
  openGraph: { type: "website", siteName: "EduPro", locale: "en_US", description: DESCRIPTION },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={aeonik.variable}>
      {/* Browser extensions add attributes to <body> before hydration; ignore those. */}
      <body className={`${aeonik.className} antialiased min-h-screen bg-white font-sans text-primary-500`} suppressHydrationWarning>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
