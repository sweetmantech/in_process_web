"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const LazyPdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <Skeleton className="h-[min(70vh,560px)] w-full min-h-[200px]" />,
});

export default LazyPdfViewer;
