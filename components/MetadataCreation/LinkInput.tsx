import { Input } from "@/components/ui/input";
import { LinkIcon } from "../ui/icons";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const LinkInput = () => {
  const { link, setLink } = useMetadataFormProvider();

  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-[#E4E0D7] bg-[#FBFAF7] px-3.5 py-3 md:mt-4 md:rounded-none md:border-grey-moss-100 md:bg-grey-moss-50 md:px-4 md:py-0">
      <LinkIcon />
      <Input
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://"
        className="!border-none !bg-transparent py-0 text-left !font-archivo !text-[14.5px] !text-grey-moss-900 !outline-none !ring-0 !ring-offset-0 placeholder:!text-[#B4AEA2] disabled:text-grey-moss-400 md:!text-md md:py-4 md:text-center md:!font-spectral"
      />
    </div>
  );
};

export default LinkInput;
