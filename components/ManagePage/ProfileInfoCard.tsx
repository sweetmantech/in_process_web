"use client";

import { Camera, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserProvider } from "@/providers/UserProvider";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import CardSectionHeader from "./CardSectionHeader";
import SocialField from "./SocialField";
import XIcon from "./XIcon";
import TelegramMomentHint from "./TelegramMomentHint";
import ProfileInfoCardActions from "./ProfileInfoCardActions";

const ProfileInfoCard = () => {
  const {
    twitter,
    instagram,
    username,
    bio,
    telegram,
    setBio,
    setTwitter,
    setInstagram,
    setTelegram,
    setUserName,
    isDirty,
    discard,
  } = useUserProvider();
  const { isLoading, onSave } = useUpdateProfile();

  return (
    <div className="rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)] md:rounded-lg md:px-6 md:py-[22px]">
      <CardSectionHeader dotColor="#FDAD00" label="your info" marginBottom="mb-3.5 md:mb-[18px]" />
      <div className="flex flex-col gap-3 md:gap-3.5">
        <fieldset className="flex flex-col gap-[5px]">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
            display name
          </Label>
          <Input
            placeholder="ex: sweetman.eth"
            className="rounded-md border-grey-moss-100 bg-[#FDFCFA] py-2.5 text-sm"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-[5px]">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">bio</Label>
          <Textarea
            placeholder="ex: I am the dev of onchain."
            minRows={3}
            className="resize-none rounded-md border-grey-moss-100 bg-[#FDFCFA] text-sm"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </fieldset>
      </div>

      <div className="-mx-4 my-4 h-px bg-grey-moss-50 md:-mx-6 md:my-[22px]" />

      <CardSectionHeader
        dotColor="#887bff"
        label="connected accounts"
        marginBottom="mb-3.5 md:mb-[18px]"
      />
      <div className="flex flex-col gap-3 md:gap-3.5">
        <SocialField
          icon={Camera}
          label="instagram"
          prefix="instagram.com/"
          placeholder="username"
          value={instagram}
          onChange={setInstagram}
        />
        <SocialField
          icon={XIcon}
          label="x"
          prefix="x.com/"
          placeholder="username"
          value={twitter}
          onChange={setTwitter}
        />
        <SocialField
          icon={Send}
          label="telegram"
          prefix="@"
          placeholder="username"
          value={telegram}
          onChange={setTelegram}
          note={<TelegramMomentHint />}
        />
      </div>

      {isDirty && (
        <ProfileInfoCardActions isSaving={isLoading} onDiscard={discard} onSave={onSave} />
      )}
    </div>
  );
};

export default ProfileInfoCard;
