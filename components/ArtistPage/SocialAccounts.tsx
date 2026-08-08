import { useProfileProvider } from "@/providers/ProfileProvider";
import { Icons } from "../ui/icons";
import { Send, InstagramIcon } from "lucide-react";
import Social from "./Social";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";

const SocialAccounts = () => {
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

  const iconWrapClass = "rounded-full border border-[rgba(28,26,23,0.2)] p-1.5 text-[#8a8578]";

  const instagramIcon = <InstagramIcon className="size-[18px] text-current" />;
  const twitterIcon = <Icons.twitter className="size-[16px] fill-current" />;
  const telegramIcon = <Send className="size-[17px] text-current" />;

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
    <div className="flex items-center gap-1">
      {instagram && (
        <Social
          link={`https://instagram.com/${extractSocialUsername(instagram)}`}
          icon={instagramIcon}
        />
      )}
      {twitter && (
        <Social link={`https://x.com/@${extractSocialUsername(twitter)}`} icon={twitterIcon} />
      )}
      {telegram && (
        <Social link={`https://t.me/${extractSocialUsername(telegram)}`} icon={telegramIcon} />
      )}
    </div>
  );
};

export default SocialAccounts;
