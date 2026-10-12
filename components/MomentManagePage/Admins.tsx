"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import AddAdmin from "./AddAdmin";
import MomentAdmin from "./MomentAdmin";
import useAdminGroups from "@/hooks/useAdminGroups";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const Admins = () => {
  const { momentAdmins } = useMomentProvider();
  const { groups } = useAdminGroups(momentAdmins);

  if (!groups) {
    return (
      <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
        <p className="font-spectral-italic text-sm text-grey-moss-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#7FD58A]" />
        <span className={FIELD_LABEL_CLASS}>current admins</span>
      </div>

      {groups.length === 0 ? (
        <p className="font-spectral-italic text-sm text-grey-moss-300">No admins added yet.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {groups.map((group) => (
            <MomentAdmin key={group.key} group={group} />
          ))}
        </div>
      )}

      <div className="my-5 border-t border-grey-moss-50" />

      <AddAdmin />
    </div>
  );
};

export default Admins;
