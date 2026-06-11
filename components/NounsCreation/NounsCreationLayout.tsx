import CreateModeSelect from "@/components/CreateModeSelect";
import MaskLines from "@/components/CreateModeSelect/MaskLines";
import Preview from "@/components/MetadataCreation/Preview";
import NounsCreateForm from "./NounsCreateForm";

const NounsCreationLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <MaskLines />
    <CreateModeSelect />
    <Preview>{children}</Preview>
    <NounsCreateForm />
  </>
);

export default NounsCreationLayout;
