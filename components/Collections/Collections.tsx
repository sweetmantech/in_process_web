"use client";

import { Label } from "@/components/ui/label";
import { CollectionItem } from "@/types/collections";
import CollectionsDropdown from "./CollectionsDropdown";

interface CollectionsProps {
  onCreateNew?: () => void;
  onSelect?: (collection: CollectionItem) => void;
  disabled?: boolean;
}

const Collections = ({ onCreateNew, onSelect, disabled }: CollectionsProps) => (
  <div className="flex w-full flex-col items-start gap-2">
    <Label htmlFor="collection" className="text-md font-archivo">
      collection
    </Label>
    <CollectionsDropdown onCreateNew={onCreateNew} onSelect={onSelect} disabled={disabled} />
  </div>
);

export default Collections;
