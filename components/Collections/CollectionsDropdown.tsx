"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import CollectionListItem from "@/components/CreateForm/CollectionItem";
import BlurImage from "@/components/BlurImage";
import Spinner from "@/components/ui/spinner";
import { CollectionItem } from "@/types/collections";
import { useCollectionsDropdown } from "@/hooks/useCollectionsDropdown";

interface CollectionsDropdownProps {
  onSelect?: (collection: CollectionItem) => void;
  onCreateNew?: () => void;
}

const CollectionsDropdown = ({ onSelect, onCreateNew }: CollectionsDropdownProps) => {
  const {
    open,
    handleOpenChange,
    currentCollection,
    displayName,
    imageUrl,
    isLoading,
    collections,
    isCollectionsLoading,
    handleSelect,
  } = useCollectionsDropdown(onSelect);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id="collection"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
        >
          <div className="flex items-center gap-2">
            {isLoading || !currentCollection ? (
              <div className="h-[24px] w-[24px] animate-pulse rounded bg-neutral-200" />
            ) : (
              <div className="relative h-[24px] w-[24px] shrink-0 overflow-hidden rounded">
                <BlurImage
                  src={imageUrl}
                  alt={displayName}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <span>{displayName}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search collections..." className="font-spectral" />
          <CommandList>
            <CommandEmpty className="font-spectral">No collections found.</CommandEmpty>
            {onCreateNew && (
              <CommandGroup>
                <CommandItem
                  value="new"
                  onSelect={onCreateNew}
                  className="border-b border-grey font-spectral"
                  keywords={["new", "collection"]}
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  New Collection
                </CommandItem>
              </CommandGroup>
            )}
            <CommandGroup>
              {isCollectionsLoading ? (
                <div className="flex items-center justify-center py-2">
                  <Spinner className="size-4" />
                </div>
              ) : (
                collections.map((collection) => (
                  <CollectionListItem
                    key={collection.id}
                    collection={collection}
                    isSelected={currentCollection === collection.address}
                    onSelect={() => handleSelect(collection)}
                  />
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CollectionsDropdown;
