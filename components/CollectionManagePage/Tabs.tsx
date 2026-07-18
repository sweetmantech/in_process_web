import TabButton from "./TabButton";
import useIsManageableCollection from "@/hooks/useIsManageableCollection";

export enum COLLECTION_MANAGE_TABS {
  MEDIA,
  ADMINS,
  MOMENTS,
}

interface TabsProps {
  selectedTab: number;
  onChangeTab: (_value: number) => void;
}

const Tabs = ({ selectedTab, onChangeTab }: TabsProps) => {
  const hideNonMedia = !useIsManageableCollection();

  return (
    <section className="w-full py-4">
      <div className="flex gap-3 border-b border-grey-moss-200 md:gap-5">
        <TabButton
          label="Media"
          active={selectedTab === COLLECTION_MANAGE_TABS.MEDIA}
          onClick={() => onChangeTab(COLLECTION_MANAGE_TABS.MEDIA)}
        />
        {!hideNonMedia && (
          <TabButton
            label="Admins"
            active={selectedTab === COLLECTION_MANAGE_TABS.ADMINS}
            onClick={() => onChangeTab(COLLECTION_MANAGE_TABS.ADMINS)}
          />
        )}
        <TabButton
          label="Moments"
          active={selectedTab === COLLECTION_MANAGE_TABS.MOMENTS}
          onClick={() => onChangeTab(COLLECTION_MANAGE_TABS.MOMENTS)}
        />
      </div>
    </section>
  );
};

export default Tabs;
