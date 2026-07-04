import useLayout from "@/hooks/useLayout";
import { createContext, useMemo, useContext } from "react";
import Layout from "@/components/Layout";

const LayoutContext = createContext<ReturnType<typeof useLayout> | null>(null);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const layout = useLayout();

  const value = useMemo(
    () => ({
      ...layout,
    }),
    [layout]
  );

  return (
    <LayoutContext.Provider value={value}>
      <Layout>{children}</Layout>
    </LayoutContext.Provider>
  );
};

export const useLayoutProvider = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutProvider must be used within a LayoutProvider");
  }
  return context;
};

export default LayoutProvider;
