type ConnectionButtonTone = "default" | "danger" | "muted";

const TONE_CLASSNAME: Record<ConnectionButtonTone, string> = {
  default: "text-grey-moss-900",
  danger: "text-red-dark",
  muted: "text-grey-moss-300 hover:text-grey-moss-900",
};

export const classNames = (tone: ConnectionButtonTone = "default") =>
  `rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] hover:border-grey-moss-300 md:px-[18px] md:py-2 md:text-[12.5px] ${TONE_CLASSNAME[tone]}`;
