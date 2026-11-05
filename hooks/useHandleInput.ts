import { useMemo } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import getHandleError from "@/lib/artists/getHandleError";

const useHandleInput = () => {
  const { handle, setHandle } = useUserProvider();

  const onHandleChange = (value: string) => setHandle(value.toLowerCase().replace(/\s/g, ""));

  const handleError = useMemo(() => getHandleError(handle), [handle]);

  return { handle, onHandleChange, handleError };
};

export default useHandleInput;
