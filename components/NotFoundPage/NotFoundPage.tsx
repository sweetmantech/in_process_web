import Link from "next/link";

const NotFoundPage = () => (
  <div className="relative w-full grow text-[#1B1504]">
    <main className="mx-auto flex max-w-[1100px] flex-col items-start px-5 pb-[120px] pt-16 md:px-10 md:pt-24">
      <p className="mb-3 font-archivo text-[12px] uppercase tracking-[0.1em] text-[#6B6456]">404</p>
      <h1 className="mb-5 font-spectral text-[40px] font-normal leading-[1.02] tracking-[-0.025em] md:text-[64px]">
        Page not found
      </h1>
      <p className="mb-9 font-spectral text-[16px] leading-[1.65] text-[#6B6456] md:text-[18px]">
        This page doesn&apos;t exist, or the artist hasn&apos;t claimed this link yet.
      </p>
      <Link
        href="/"
        className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-[18px] py-2 font-archivo-medium text-[12.5px] text-white hover:bg-black"
      >
        back to timeline
      </Link>
    </main>
  </div>
);

export default NotFoundPage;
