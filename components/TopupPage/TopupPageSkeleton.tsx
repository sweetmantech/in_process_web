import TopupPageHeader from "./TopupPageHeader";
import TopupWalletCardSkeleton from "./TopupWalletCardSkeleton";
import TopupBalanceCardSkeleton from "./TopupBalanceCardSkeleton";

const TopupPageSkeleton = () => (
  <main className="min-h-screen p-4 md:p-8">
    <div className="mx-auto max-w-4xl space-y-6">
      <TopupPageHeader />
      <div className="grid gap-6 md:grid-cols-2">
        <TopupWalletCardSkeleton />
        <div className="space-y-6">
          <TopupBalanceCardSkeleton />
          <TopupBalanceCardSkeleton />
        </div>
      </div>
    </div>
  </main>
);

export default TopupPageSkeleton;
