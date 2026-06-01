import { createContext, useContext } from "react";
import useAuthorization from "@/hooks/useAuthorization";

type AuthorizationContextType = {
  getAuthHeaders: () => Promise<HeadersInit>;
};

const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

export const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAuthHeaders } = useAuthorization();

  return (
    <AuthorizationContext.Provider value={{ getAuthHeaders }}>
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
