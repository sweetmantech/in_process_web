type Props = {
  label: string;
};

const IconHint = ({ label }: Props) => (
  <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-grey-moss-900 px-2 py-1 font-archivo text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
    {label}
  </span>
);

export default IconHint;
