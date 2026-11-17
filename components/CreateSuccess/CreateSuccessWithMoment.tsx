import { MomentProvider } from "@/providers/MomentProvider";
import useCreateSuccessRequestState from "@/hooks/useCreateSuccessRequestState";
import CreateSuccess from "./CreateSuccess";

const CreateSuccessWithMoment = () => {
  const { momentQuery } = useCreateSuccessRequestState();

  return (
    <MomentProvider moment={momentQuery}>
      <CreateSuccess />
    </MomentProvider>
  );
};

export default CreateSuccessWithMoment;
