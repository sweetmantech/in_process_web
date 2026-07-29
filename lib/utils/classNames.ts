type ConnectionButtonTone = "default" | "danger" | "muted";

const TONE_CLASSNAME: Record<ConnectionButtonTone, string> = {
  default: "text-grey-moss-900",
  danger: "text-red-dark",
  muted: "text-grey-moss-300 hover:text-grey-moss-900",
};

export const classNames = (tone: ConnectionButtonTone = "default") =>
  `rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] hover:border-grey-moss-300 md:px-[18px] md:py-2 md:text-[12.5px] ${TONE_CLASSNAME[tone]}`;

export const CARD_CLASS =
  "rounded-[10px] border border-[#E4E0D7] bg-white p-5 shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]";

export const PILL_BTN_CLASS =
  "flex flex-1 items-center justify-center gap-1.5 rounded-[20px] border border-[#E4E0D7] bg-white/80 px-2 py-2.5 font-archivo-medium text-xs text-[#6B6456] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900";
