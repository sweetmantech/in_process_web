import { createContext, useContext } from "react";
import useAuthHeaders from "@/hooks/useAuthHeaders";

type AuthorizationContextType = {
  authorization: HeadersInit;
};

const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

export const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const authorization = useAuthHeaders();

  return (
    <AuthorizationContext.Provider value={{ authorization }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorizationProvider = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("useAuthorizationProvider must be used within an AuthorizationProvider");
  }
  return context;
};

export default AuthorizationProvider;
