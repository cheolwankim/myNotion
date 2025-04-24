"use client";
import { createContext, useContext, useCallback, useState } from "react";
const SidebarContext = createContext({
  refreshKey: 0,
  refreshDocs: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDocs = useCallback(() => {
    console.log("🔁 refreshDocs 실행됨");
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <SidebarContext.Provider value={{ refreshKey, refreshDocs }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
export const useSidebarRefreshKey = () => useSidebar().refreshDocs;
