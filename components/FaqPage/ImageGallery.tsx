import Image from "next/image";
import { ImageGalleryItem } from "@/lib/faq/faqImages";
import { getCaptionClasses } from "@/lib/faq/getCaptionClasses";

const DEFAULT_CAPTION_CLASSNAME =
  "font-spectral text-left font-medium tracking-tight text-[#4E4E4E] text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 italic antialiased";

const GRID_COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};

interface ImageGalleryProps {
  images: ImageGalleryItem[];
  captionClassName?: string;
  columns?: 2 | 3;
  shadow?: boolean;
  className?: string;
}

const ImageGallery = ({
  images,
  captionClassName = DEFAULT_CAPTION_CLASSNAME,
  columns = 2,
  shadow = false,
  className,
}: ImageGalleryProps) => {
  return (
    <div className={`grid grid-cols-1 gap-4 lg:gap-6 ${GRID_COLS[columns]} ${className ?? ""}`}>
      {images.map((image, index) => (
        <div key={index} className="space-y-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={500}
            quality={100}
            priority={index === 0}
            className={`-ml-2 h-auto w-full rounded-sm object-contain md:-ml-5 ${shadow ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)]" : ""}`}
          />
          <p className={`${captionClassName} ${getCaptionClasses(image.caption)}`}>
            {image.caption}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
