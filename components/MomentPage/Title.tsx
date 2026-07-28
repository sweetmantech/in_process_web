import truncated from "@/lib/truncated";
import { useMomentProvider } from "@/providers/MomentProvider";

const Title = () => {
  const { metadata } = useMomentProvider();
  if (!metadata) return null;

  return (
    <h1 className="line-clamp-2 font-spectral text-[26px] leading-[1.15] tracking-tight text-grey-moss-900">
      {truncated(metadata.name, 100)}
    </h1>
  );
};

export default Title;
