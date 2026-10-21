import { useArtistCollections } from "@/hooks/useArtistCollections";
import { useDefaultCollection } from "@/hooks/useDefaultCollection";
import MomentsSkeleton from "@/components/MomentsGrid/MomentsSkeleton";
import ManageCollectionItem from "./ManageCollectionItem";

interface ManageCollectionsProps {
  artist: string;
}

const ManageCollections = ({ artist }: ManageCollectionsProps) => {
  const { data, isLoading } = useArtistCollections(artist);
  const { data: defaultCollection } = useDefaultCollection(artist);
  const collections = data?.collections ?? [];
  const defaultAddress = defaultCollection?.address.toLowerCase();

  if (isLoading) return <MomentsSkeleton />;
  if (collections.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-600">No collections found</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grow grid-cols-1 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {collections.map((collection) => (
        <ManageCollectionItem
          key={collection.id}
          collection={collection}
          isDefault={collection.address.toLowerCase() === defaultAddress}
        />
      ))}
    </div>
  );
};

export default ManageCollections;
