import ProfileInfoCardSkeleton from "./ProfileInfoCardSkeleton";
import ConnectionsCardSkeleton from "./ConnectionsCardSkeleton";

const AccountPageSkeleton = () => (
  <main className="flex flex-col gap-3 pb-6 font-archivo md:gap-4 md:pb-0">
    <ProfileInfoCardSkeleton />
    <ConnectionsCardSkeleton />
  </main>
);

export default AccountPageSkeleton;
