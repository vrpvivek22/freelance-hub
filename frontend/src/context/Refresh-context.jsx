import { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export function RefreshProvider({ children }) {
  const [refreshFlag, setRefreshFlag] = useState(0);

  function refresh() {
    setRefreshFlag((prev) => prev + 1);
  }

  return (
    <RefreshContext.Provider value={{ refreshFlag, refresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  return useContext(RefreshContext);
}
