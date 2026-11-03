import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/providers/Providers";
import { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts/fontVariables";
import { preconnect } from "react-dom";
import { IN_PROCESS_API_ORIGIN } from "@/lib/consts";

export const metadata: Metadata = {
  alternates: {
    types: {
      "text/plain": "/llms.txt",
    },
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect(IN_PROCESS_API_ORIGIN);

  return (
    <html lang="en" className={`${fontVariables} overscroll-y-none bg-white md:bg-grey-moss-100`}>
      <body className="flex min-h-screen w-full flex-col overflow-x-hidden overscroll-y-none bg-white text-grey-moss-900 md:bg-grey-moss-100">
        <Suspense>
          <Providers>{children}</Providers>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
