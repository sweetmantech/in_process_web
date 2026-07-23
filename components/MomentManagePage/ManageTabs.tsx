import TabButton from "./TabButton";
import useIsManageableCollection from "@/hooks/useIsManageableCollection";

export enum MANAGE_TABS {
  MEDIA,
  AIRDROP,
  SALE,
  ADMIN,
}

interface ManageTabsProps {
  onChangeTab: (_value: number) => void;
  selectedTab: number;
}

const ManageTabs = ({ selectedTab, onChangeTab }: ManageTabsProps) => {
  const hideNonMedia = !useIsManageableCollection();

  return (
    <section className="w-full py-4">
      <div className="flex gap-3 border-b border-grey-moss-200 md:gap-5">
        <TabButton
          label="Media"
          active={selectedTab === MANAGE_TABS.MEDIA}
          onClick={() => onChangeTab(MANAGE_TABS.MEDIA)}
        />
        {!hideNonMedia && (
          <>
            <TabButton
              label="Airdrop"
              active={selectedTab === MANAGE_TABS.AIRDROP}
              onClick={() => onChangeTab(MANAGE_TABS.AIRDROP)}
            />
            <TabButton
              label="Sale"
              active={selectedTab === MANAGE_TABS.SALE}
              onClick={() => onChangeTab(MANAGE_TABS.SALE)}
            />
            <TabButton
              label="Admins"
              active={selectedTab === MANAGE_TABS.ADMIN}
              onClick={() => onChangeTab(MANAGE_TABS.ADMIN)}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ManageTabs;
