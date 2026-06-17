import Image from "next/image";
import getChainLogo from "@/lib/getChainLogo";

interface ChainLogoProps {
  chainId: number;
}

const ChainLogo = ({ chainId }: ChainLogoProps) => {
  const chainLogo = getChainLogo(chainId);
  if (!chainLogo) return null;

  return (
    <Image
      src={chainLogo.src}
      alt={chainLogo.alt}
      width={14}
      height={14}
      className="rounded-full opacity-90"
    />
  );
};

export default ChainLogo;
