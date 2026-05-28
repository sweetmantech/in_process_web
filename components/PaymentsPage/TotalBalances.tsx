"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";

export function TotalBalances() {
  const { isLoading, ethBalance, usdcBalance } = useSmartAccountProvider();

  return (
    <div className="grid grid-cols-2 gap-2">
      <Card>
        <CardContent className="pt-3 pb-3">
          <div className="space-y-0.5">
            <p className="text-xs font-spectral-italic text-grey-secondary">ETH Balance</p>
            <p className="text-base font-archivo-bold text-grey-moss-900">
              {isLoading ? "Loading..." : `${ethBalance} ETH`}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-3 pb-3">
          <div className="space-y-0.5">
            <p className="text-xs font-spectral-italic text-grey-secondary">USDC Balance</p>
            <p className="text-base font-archivo-bold text-grey-moss-900">
              {isLoading ? "Loading..." : `${usdcBalance} USDC`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
