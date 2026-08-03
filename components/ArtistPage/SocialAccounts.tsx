import { useProfileProvider } from "@/providers/ProfileProvider";
import { Icons, TwitterIcon, TwitterXsIcon } from "../ui/icons";
import { Send, InstagramIcon } from "lucide-react";
import Social from "./Social";
import useIsMobile from "@/hooks/useIsMobile";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "default" | "subtle";
};

const SocialAccounts = ({ variant = "default" }: Props) => {
  const {
    twitter,
    instagram,
    telegram,
    isEditing,
    socialRef,
    setTwitter,
    setInstagram,
    setTelegram,
  } = useProfileProvider();

  const isMobile = useIsMobile();
  const isSubtle = variant === "subtle";

  const iconWrapClass = isSubtle
    ? "rounded-full border border-[rgba(28,26,23,0.2)] p-1.5 text-[#8a8578]"
    : "rounded-sm bg-grey-primary p-1";

  const instagramIcon = (
    <InstagramIcon
      className={cn(isSubtle ? "size-[18px] text-current" : "size-5 text-grey-eggshell md:size-7")}
    />
  );
  const twitterIcon = isSubtle ? (
    <Icons.twitter className="size-[16px] fill-current" />
  ) : isMobile ? (
    <TwitterXsIcon />
  ) : (
    <TwitterIcon />
  );
  const telegramIcon = (
    <Send
      className={cn(isSubtle ? "size-[17px] text-current" : "size-5 text-grey-eggshell md:size-7")}
    />
  );

  if (isEditing)
    return (
      <div className="flex flex-col gap-2 md:flex-row md:pt-4" ref={socialRef}>
        <fieldset className="flex items-center gap-2">
          <div className={iconWrapClass}>{instagramIcon}</div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <div className={iconWrapClass}>{twitterIcon}</div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <div className={iconWrapClass}>{telegramIcon}</div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </fieldset>
      </div>
    );

  return (
    <div className={cn("flex items-center", isSubtle ? "gap-1 pt-1" : "gap-2 pt-2")}>
      {instagram && (
        <Social
          link={`https://instagram.com/${extractSocialUsername(instagram)}`}
          icon={instagramIcon}
          variant={variant}
        />
      )}
      {twitter && (
        <Social
          link={`https://x.com/@${extractSocialUsername(twitter)}`}
          icon={twitterIcon}
          variant={variant}
        />
      )}
      {telegram && (
        <Social
          link={`https://t.me/${extractSocialUsername(telegram)}`}
          icon={telegramIcon}
          variant={variant}
        />
      )}
    </div>
  );
};

export default SocialAccounts;
