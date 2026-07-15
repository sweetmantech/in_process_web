import { ComponentType, SVGProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialFieldProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  prefix: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SocialField = ({
  icon: Icon,
  label,
  prefix,
  placeholder,
  value,
  onChange,
}: SocialFieldProps) => (
  <fieldset className="flex flex-col gap-[5px]">
    <Label className="flex items-center gap-[7px] text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
      <Icon className="size-[14px]" />
      {label}
    </Label>
    <div className="flex items-center overflow-hidden rounded-md border border-grey-moss-100 bg-[#FDFCFA]">
      <span className="whitespace-nowrap py-2.5 pl-3 font-spectral text-sm text-grey-moss-300">
        {prefix}
      </span>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none bg-transparent py-2.5 pl-0.5 pr-3 text-sm"
      />
    </div>
  </fieldset>
);

export default SocialField;
