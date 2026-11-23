import { MomentProvider } from "@/providers/MomentProvider";
import useCreateSuccessRequestState from "@/hooks/useCreateSuccessRequestState";
import CreateSuccess from "./CreateSuccess";
import { SUCCESS_MOMENT_FETCH_RETRY, SUCCESS_MOMENT_FETCH_TIMEOUT_MS } from "@/lib/consts";

const SUCCESS_FETCH_OPTIONS = {
  timeoutMs: SUCCESS_MOMENT_FETCH_TIMEOUT_MS,
  retry: SUCCESS_MOMENT_FETCH_RETRY,
};

const CreateSuccessWithMoment = () => {
  const { momentQuery } = useCreateSuccessRequestState();

  return (
    <MomentProvider moment={momentQuery} fetchOptions={SUCCESS_FETCH_OPTIONS}>
      <CreateSuccess />
    </MomentProvider>
  );
};

export default CreateSuccessWithMoment;
