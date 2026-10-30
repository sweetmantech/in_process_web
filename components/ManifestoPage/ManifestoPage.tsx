"use client";

import Image from "next/image";
import MobileOnly from "@/components/Responsive/MobileOnly";
import DesktopOnly from "@/components/Responsive/DesktopOnly";

const ManifestoPage = () => {
  return (
    <div className="relative flex w-full grow flex-col gap-4 px-4 pb-[8%] pt-6 md:flex-row md:gap-16 md:px-0 md:pt-20">
      <div className="relative aspect-[376/236] w-full md:aspect-[546/1157] md:w-1/4">
        <MobileOnly>
          <Image
            src="/spiral_top.svg"
            blurDataURL="/spiral_top.png"
            layout="fill"
            alt="not found artwork"
            objectFit="cover"
            objectPosition="right"
          />
        </MobileOnly>
        <DesktopOnly>
          <Image
            src="/left_circles.svg"
            blurDataURL="/left_circles.png"
            layout="fill"
            alt="not found artwork"
            objectFit="cover"
            objectPosition="right"
          />
        </DesktopOnly>
      </div>
      <div className="relative flex w-full justify-center overflow-x-hidden text-grey-moss-900 md:w-2/4 md:overflow-x-visible">
        <div className="relative w-fit">
          <p className="relative z-[2] font-archivo text-2xl uppercase tracking-[-1px] md:text-5xl">
            <strong>IN PROCESS: A MANIFESTO</strong>
          </p>
          <p className="relative z-[2] pt-6 font-spectral-italic uppercase">
            <em>
              <strong>THE TIMELINE WAS NEVER THEIRS. IT WAS ALWAYS OURS.</strong>
            </em>
          </p>
          <div className="relative z-[2] whitespace-pre-line pt-4 font-spectral text-[11px] normal-case tracking-[-1px] md:text-[16px]">
            {`They told us the artist needed the platform.
Like we were guests at a table built from our own bones.
Like visibility was a favor, not a debt.
Like without them, we would vanish—scattered notes, lost rhythms, blueprints
erased before they were ever built.

`}
            <strong>They lied.</strong>
            {`

Platforms have always needed us.
`}
            <em>
              <strong>The algorithm starves without our stories.</strong>
            </em>
            {`
The stream is silent without our sound.
The feed is nothing but a blinking cursor, waiting on us to move.
Yet they hold the archive hostage.
Rewrite history in real time.
Bury what doesn't fit their metrics.
And call it discovery.
We refuse.

`}
            <em>
              <strong>
                In Process is a space for process. For lineage. For the drafts that built dynasties.
              </strong>
            </em>
            {`
For the blueprints they stole, repackaged, and resold.
For the histories that deserve permanence, not expiration dates.

`}
            <em>
              <strong>
                In Process is not content—it&rsquo;s record-keeping. It&rsquo;s proof. It&rsquo;s
                legacy.
              </strong>
            </em>
            {`
This is where the work lives.
Where artists own their evolution.
Where every sketch, verse, sound, and glitch is a timestamp in culture.
Here, we own the timeline.
Here, we document in real time, onchain, on our terms.`}
          </div>
          <p className="pt-4 font-spectral-bold text-xl uppercase">
            <em>
              <strong>ALWAYS IN PROCESS.</strong>
            </em>
          </p>
          <div className="relative -translate-y-1/3 translate-x-1/2 md:absolute md:bottom-0 md:right-0 md:translate-x-0 md:translate-y-3/4">
            <Image
              src="/signature.svg"
              blurDataURL="/signature.png"
              alt="not found signature"
              width={218}
              height={195}
              className="h-auto w-[120px] min-[769px]:w-[218px]"
            />
          </div>
        </div>
      </div>
      <div className="relative aspect-[376/236] w-full md:aspect-[546/1157] md:w-1/4">
        <MobileOnly>
          <Image
            src="/spiral_bottom.svg"
            blurDataURL="/spiral_bottom.png"
            layout="fill"
            alt="not found artwork"
            objectFit="cover"
            objectPosition="left"
          />
        </MobileOnly>
        <DesktopOnly>
          <Image
            src="/right_circles.svg"
            blurDataURL="/right_circles.png"
            layout="fill"
            alt="not found artwork"
            objectFit="cover"
            objectPosition="left"
          />
        </DesktopOnly>
      </div>
    </div>
  );
};

export default ManifestoPage;
