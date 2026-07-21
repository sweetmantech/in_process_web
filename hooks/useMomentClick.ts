import { useRouter } from "next/navigation";
import { TimelineMoment } from "@/types/moment";
import { getMomentUrl } from "@/lib/moment/getMomentUrl";

export const useMomentClick = (moment: TimelineMoment | undefined) => {
  const { push } = useRouter();
  const data = moment?.metadata;

  const handleMomentClick = () => {
    if (!moment) return;
    const momentUrl = getMomentUrl(moment);
    if (!momentUrl) return;
    if (momentUrl.isExternal) {
      window.open(momentUrl.href, "_blank", "noopener,noreferrer");
      return;
    }
    push(momentUrl.href);
  };

  return { handleMomentClick, data };
};
