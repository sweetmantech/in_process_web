import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => (
  <main className="relative flex w-full grow items-center justify-center px-5 pb-20 pt-10 text-grey-moss-900 md:px-10 md:pb-28 md:pt-16">
    <div className="grid w-full max-w-[1040px] items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
      <div className="order-2 flex flex-col items-start md:order-1">
        <p className="mb-5 inline-flex items-center gap-2 font-archivo text-[11px] uppercase tracking-[0.12em] text-grey-moss-300">
          <span className="h-1.5 w-1.5 rounded-full bg-tan" />
          Error 404
        </p>
        <h1 className="mb-5 font-spectral-italic text-[44px] leading-[1.02] tracking-[-1.5px] md:text-[68px]">
          This page is
          <br />
          still in process
        </h1>
        <p className="mb-9 max-w-[440px] font-spectral text-[16px] leading-[1.65] text-grey-moss-300 md:text-[18px]">
          The link may be broken, or the artist hasn&apos;t claimed this handle yet.
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-grey-moss-900 px-5 py-2.5 font-archivo-medium text-sm text-white transition-colors hover:bg-black"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            Back to timeline
          </Link>
          <Link
            href="/manifesto"
            className="inline-flex items-center rounded-full border border-grey-moss-100 bg-white/70 px-5 py-2.5 font-archivo-medium text-sm text-grey-moss-900 transition-colors hover:bg-white"
          >
            Read the manifesto
          </Link>
        </div>
      </div>

      <div className="order-1 mx-auto w-full max-w-[380px] md:order-2">
        <div className="-rotate-2 overflow-hidden rounded-[6px] border border-grey-moss-100 bg-white shadow-[0_18px_40px_-18px_rgba(27,21,4,.35)] transition-transform duration-500 hover:rotate-0">
          <div className="relative aspect-[376/236] w-full">
            <Image src="/spiral_top.svg" alt="" fill className="object-cover" priority />
          </div>
          <div className="px-[15px] pb-[15px] pt-[13px]">
            <div className="flex items-center justify-between gap-[9px]">
              <span className="font-archivo-medium text-base">Unknown artist</span>
              <span className="font-archivo text-xs text-tan-gold">404</span>
            </div>
            <span className="font-archivo text-xs text-grey-moss-300">Draft</span>
            <p className="mt-2 font-spectral-italic text-lg leading-snug">
              Nothing here yet. Keep exploring.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default NotFoundPage;
