"use client";

import { Button } from "@/components/ui/button";
import useAccessToken from "@/hooks/useAccessToken";

export function AccessToken() {
  const { copyAccessToken, expiresAt } = useAccessToken();

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-archivo-medium text-grey-moss-900">Short-lived access token</h3>
        <p className="mt-1 font-spectral text-sm text-grey-secondary">
          For giving an agent access to one task. Can act as you, including spending from your
          wallet, until it expires.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={copyAccessToken}
          className="rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
        >
          Copy access token
        </Button>
        <span className="font-spectral text-sm text-grey-secondary">
          {expiresAt ? `Expires at ${expiresAt.toLocaleString()}` : "Expires within 1 hour"}
        </span>
      </div>
    </div>
  );
}
