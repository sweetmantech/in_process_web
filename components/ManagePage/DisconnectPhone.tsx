import { Smartphone } from "lucide-react";
import { classNames } from "@/lib/classNames";
import useDisconnectPhone from "@/hooks/useDisconnectPhone";
import { useUserProvider } from "@/providers/UserProvider";
import ConnectionItem from "./ConnectionItem";

const DisconnectPhone = () => {
  const { handleDisconnect, isDisconnecting } = useDisconnectPhone();
  const { phoneNumber } = useUserProvider();

  return (
    <ConnectionItem icon={Smartphone} label="Phone" connected meta={phoneNumber} isLast>
      <button
        type="button"
        onClick={handleDisconnect}
        disabled={isDisconnecting}
        className={classNames("danger")}
      >
        {isDisconnecting ? "Disconnecting..." : "Disconnect"}
      </button>
    </ConnectionItem>
  );
};

export default DisconnectPhone;
