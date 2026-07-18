import { Clock, Settings, LogOut, User } from "lucide-react";

const ITEM_CLASS =
  "flex w-full items-center gap-4 px-7 py-[16px] text-left font-archivo text-[17px] text-white active:bg-[#333333]";

const Divider = () => <div className="mx-5 border-b border-white/10" />;

interface UserDrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeline: () => void;
  onManage: () => void;
  onLogout: () => void;
  isMiniApp: boolean;
  displayName: string | null;
}

const UserDrawerPanel = ({
  isOpen,
  onClose,
  onTimeline,
  onManage,
  onLogout,
  isMiniApp,
  displayName,
}: UserDrawerPanelProps) => (
  <>
    {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}
    <div
      className={`fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-50 overflow-hidden bg-grey-moss-900 shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
        isOpen ? "translate-y-0" : "pointer-events-none translate-y-[2000px]"
      }`}
    >
      <button onClick={onTimeline} className={ITEM_CLASS}>
        <Clock className="h-[18px] w-[18px] opacity-60" strokeWidth={1.5} />
        Timeline
      </button>
      <Divider />
      <button onClick={onManage} className={ITEM_CLASS}>
        <Settings className="h-[18px] w-[18px] opacity-60" strokeWidth={1.5} />
        Manage
      </button>
      {isMiniApp ? (
        displayName && (
          <>
            <Divider />
            <div className="flex w-full items-center gap-4 px-7 py-[16px]">
              <User className="h-[18px] w-[18px] shrink-0 text-white/40" strokeWidth={1.5} />
              <span className="font-archivo-medium text-[13px] text-white/60">{displayName}</span>
            </div>
          </>
        )
      ) : (
        <>
          <Divider />
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-4 px-7 py-[16px] active:bg-[#333333]"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0 text-white/40" strokeWidth={1.5} />
            <div className="flex flex-col items-start">
              {displayName && (
                <span className="font-archivo-medium text-[13px] text-white/60">{displayName}</span>
              )}
              <span className="font-archivo text-[15px] text-white/40">Log out</span>
            </div>
          </button>
        </>
      )}
    </div>
  </>
);

export default UserDrawerPanel;
