"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Copy } from "lucide-react";
import useAccessToken from "@/hooks/useAccessToken";

export function AccessToken() {
  const { copyAccessToken, expiresAt } = useAccessToken();

  return (
    <div className="space-y-3">
      <h3 className="font-archivo-medium text-grey-moss-900">Access Token</h3>
      <p className="font-spectral-italic text-sm text-grey-secondary">
        A short-lived token for a single task, such as giving an agent access.
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={copyAccessToken}
        className="flex items-center gap-2 font-archivo"
      >
        <Copy className="h-4 w-4" />
        Copy access token
      </Button>
      {expiresAt && (
        <p className="font-spectral text-sm text-grey-moss-900">
          Expires at {expiresAt.toLocaleString()}
        </p>
      )}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="font-spectral text-sm text-amber-700">
            Until it expires, anyone with this token can act as you, including spending from your
            wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
