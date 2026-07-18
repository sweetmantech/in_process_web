"use client";

import { Address } from "viem";
import { Fragment } from "react";
import CollectionAdmin from "./CollectionAdmin";
import AddCollectionAdmin from "./AddCollectionAdmin";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const Admins = () => {
  const { data } = useCollectionProvider();

  if (!data) return <Fragment />;

  const { admins } = data;

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#7FD58A]" />
        <span className={FIELD_LABEL_CLASS}>current admins</span>
      </div>

      {admins.length === 0 ? (
        <p className="font-spectral-italic text-sm text-grey-moss-300">No admins added yet.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {admins.map((address: Address) => (
            <CollectionAdmin key={address} address={address} />
          ))}
        </div>
      )}

      <div className="my-5 border-t border-grey-moss-50" />

      <AddCollectionAdmin />
    </div>
  );
};

export default Admins;
