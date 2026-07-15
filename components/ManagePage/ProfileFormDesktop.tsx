"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserProvider } from "@/providers/UserProvider";
import TelegramMomentHint from "./TelegramMomentHint";

const ProfileFormDesktop = () => {
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
  } = useUserProvider();
  return (
    <div className="hidden md:block">
      <section className="grid grid-cols-12 gap-1">
        <p className="col-span-12 text-base md:col-span-2">your info</p>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
          <fieldset>
            <Label>display name</Label>
            <Input
              placeholder="ex: sweetman.eth"
              className="mt-1 resize-none font-spectral"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>bio</Label>
            <Textarea
              placeholder="ex: I am the dev of onchain."
              minRows={7}
              className="mt-1 resize-none font-spectral"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
        </div>
      </section>
      <section className="mt-6 grid grid-cols-12 gap-1 md:mt-24">
        <p className="col-span-12 text-base md:col-span-2">
          connected <br className="hidden md:block" />
          accounts
        </p>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
          <fieldset>
            <Label>instagram</Label>
            <Input
              placeholder="ex: https://instagram.com/helly"
              className="mt-1 resize-none font-spectral"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>x</Label>
            <Input
              placeholder="ex: https://x.com/helly"
              className="mt-1 resize-none font-spectral"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>telegram</Label>
            <Input
              placeholder="ex: @sweetman_eth"
              className="mt-1 resize-none font-spectral"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            <TelegramMomentHint />
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default ProfileFormDesktop;
