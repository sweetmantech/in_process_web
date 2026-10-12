"use client";

import { Trash2 } from "lucide-react";
import truncateAddress from "@/lib/utils/truncateAddress";
import { AdminGroup } from "@/types/admins";
import useRemoveMomentAdmin from "@/hooks/useRemoveMomentAdmin";
import useIsOwnAdminGroup from "@/hooks/useIsOwnAdminGroup";
import { useMomentProvider } from "@/providers/MomentProvider";

const MomentAdmin = ({ group }: { group: AdminGroup }) => {
  const { handleRemoveAdmin, isRemoving } = useRemoveMomentAdmin();
  const isOwnGroup = useIsOwnAdminGroup(group);
  const { isOwner } = useMomentProvider();

  const label = group.username || truncateAddress(group.addresses[0]);
  const initial = group.username ? group.username.charAt(0).toUpperCase() : "0x";

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-grey-moss-100 bg-grey-moss-50/60 px-3.5 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-grey-moss-300 font-archivo-bold text-[11px] text-white">
          {initial}
        </span>
        <p className="truncate font-archivo text-[13.5px] text-grey-moss-900">{label}</p>
      </div>
      {isOwnGroup ? (
        <span className="shrink-0 rounded-full bg-grey-moss-50 px-2.5 py-1 font-archivo-medium text-[10px] uppercase tracking-wider text-grey-moss-300">
          you
        </span>
      ) : (
        isOwner && (
          <button
            type="button"
            onClick={() => handleRemoveAdmin(group.addresses)}
            disabled={isRemoving}
            aria-label="Remove admin"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="size-3.5" />
          </button>
        )
      )}
    </div>
  );
};

export default MomentAdmin;
