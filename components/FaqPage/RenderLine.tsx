import { parseHTML } from "@/lib/faq/parseHTML";

export const RenderLine = (line: string, lineIndex: number) => {
  if (line.trim() === "") {
    return <div key={lineIndex} className="mb-3"></div>;
  }

  const isBulletPoint = line.trim().startsWith("•");
  const isNumberedItem = /^\s*\d+\./.test(line);

  return (
    <div key={lineIndex} className={`mb-1 ${isBulletPoint || isNumberedItem ? "ml-4" : ""}`}>
      <span
        className={`font-spectral text-[15px] font-normal leading-[1.75] tracking-[-0.01em] text-[#4A4437] antialiased md:text-[16px] [&_a]:text-[#A8862F] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#1B1504]`}
      >
        {parseHTML(line, false)}
      </span>
    </div>
  );
};
