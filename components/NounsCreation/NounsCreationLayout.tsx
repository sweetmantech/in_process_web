import CreateModeSelect from "@/components/CreateModeSelect";
import Preview from "@/components/MetadataCreation/Preview";
import NounsCreateForm from "./NounsCreateForm";

const NounsCreationLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <CreateModeSelect />
    <Preview>{children}</Preview>
    <NounsCreateForm />
  </>
);

export default NounsCreationLayout;
