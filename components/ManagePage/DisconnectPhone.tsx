import useDisconnectPhone from "@/hooks/useDisconnectPhone";

const DisconnectPhone = () => {
  const { handleDisconnect, isDisconnecting } = useDisconnectPhone();

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
