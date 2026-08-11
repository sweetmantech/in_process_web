import { CodeXml, X } from "lucide-react";
import Image from "next/image";
import isHtml from "is-html";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { parseHTML } from "@/lib/faq/parseHTML";

const EmbedCode = () => {
  const { createdTokenId } = useMomentCreateProvider();
  const { embedCode, setEmbedCode, name } = useMetadataFormProvider();

  if (createdTokenId)
    return (
      <div className="size-full h-fit overflow-hidden rounded-2xl">
        <div>{parseHTML(embedCode, true)}</div>
        <div className="bg-white py-4 text-center">
          <p className="font-spectral-italic">{name}</p>
        </div>
      </div>
    );

  const isValidHtml = Boolean(embedCode && isHtml(embedCode));
  const isInvalidHtml = Boolean(embedCode && !isHtml(embedCode));

  return (
    <div className="flex w-full flex-col items-center gap-3 md:size-full md:gap-[18px] md:p-2">
      <div className="relative flex w-full flex-col overflow-hidden rounded-[12px] border border-[#E4E0D7] bg-white px-4 py-4 shadow-[0_16px_40px_-22px_rgba(27,21,4,.3)] md:grow md:rounded-2xl md:border-0 md:px-8 md:py-4 md:shadow-none">
        <div className="relative z-[4] flex flex-col gap-3 overflow-hidden md:grow md:gap-4">
          <div className="flex items-center gap-2.5 md:flex-col md:items-center">
            <CodeXml className="size-[18px] shrink-0 text-[#A8862F] md:hidden" strokeWidth={1.75} />
            <Image
              src="/flower.svg"
              blurDataURL="/flower.png"
              alt=""
              width={69}
              height={66}
              className="hidden md:block"
            />
            <p className="font-spectral-italic text-[17px] text-grey-moss-900 md:text-center md:font-archivo-medium md:text-base md:not-italic md:uppercase">
              Paste embed code
            </p>
          </div>
          <textarea
            className={`min-h-[140px] w-full rounded-[10px] border bg-[#FBFAF7] p-3.5 font-mono text-[12.5px] leading-[1.6] text-grey-moss-900 !outline-none !ring-0 placeholder:text-[#B4AEA2] md:min-h-0 md:grow md:rounded-none md:border-0 md:bg-grey-moss-50 md:p-2 md:font-spectral md:text-base ${
              isInvalidHtml ? "border-red-dark" : "border-[#E4E0D7]"
            }`}
            value={embedCode}
            placeholder={'<iframe src="…"></iframe>'}
            onChange={(e) => setEmbedCode(e.target.value)}
          />
          {isInvalidHtml && (
            <p className="font-archivo text-[11px] text-red-dark md:hidden">
              Paste a valid embed / iframe snippet
            </p>
          )}
          {isValidHtml && (
            <Image
              src="/embed_code_check.svg"
              blurDataURL="/embed_code_check.png"
              alt=""
              width={46}
              height={46}
              className="hidden self-center md:block"
            />
          )}
          {isInvalidHtml && (
            <div className="hidden aspect-square w-[46px] items-center justify-center self-center rounded-full border-2 border-red-dark md:flex">
              <X className="size-7 text-red-dark" />
            </div>
          )}
        </div>
      </div>

      <Image
        src="/flower.svg"
        blurDataURL="/flower.png"
        alt=""
        className="hidden md:block"
        width={193}
        height={183}
      />
    </div>
  );
};

export default EmbedCode;
