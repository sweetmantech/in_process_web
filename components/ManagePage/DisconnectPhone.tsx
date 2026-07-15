import { Smartphone } from "lucide-react";
import useDisconnectPhone from "@/hooks/useDisconnectPhone";
import { useUserProvider } from "@/providers/UserProvider";
import ConnectionRow from "./ConnectionRow";

interface DisconnectPhoneProps {
  variant?: "pill" | "row";
}

const DisconnectPhone = ({ variant = "pill" }: DisconnectPhoneProps) => {
  const { handleDisconnect, isDisconnecting } = useDisconnectPhone();
  const { phoneNumber } = useUserProvider();

  if (variant === "row") {
    return (
      <ConnectionRow icon={Smartphone} label="Phone" connected meta={phoneNumber} isLast>
        <button
          type="button"
          onClick={handleDisconnect}
          disabled={isDisconnecting}
          className="rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-red-dark hover:border-grey-moss-300"
        >
          {isDisconnecting ? "disconnecting..." : "Disconnect"}
        </button>
      </ConnectionRow>
    );
  }

  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
      onClick={handleDisconnect}
      disabled={isDisconnecting}
    >
      {isDisconnecting ? "disconnecting..." : "disconnect phone"}
    </button>
  );
};

export default DisconnectPhone;
