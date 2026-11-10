const getTokenExpiry = (token: string): Date | null => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === "number" ? new Date(exp * 1000) : null;
  } catch {
    return null;
  }
};

export default getTokenExpiry;
