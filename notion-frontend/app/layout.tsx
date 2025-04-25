import { SidebarProvider } from "@/components/context/SidebarContext";
import "../styles/globals.css";
import Sidebar from "@/components/layout/Sidebar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <SessionProviderWrapper>
          <SidebarProvider>
            <div className="flex h-screen">
              <Suspense fallback={<div>사이드바 로딩 중...</div>}>
                <Sidebar />
              </Suspense>
              <main className="flex-1 overflow-y-auto">
                <Suspense fallback={<div>페이지 로딩 중...</div>}>
                  {children}
                </Suspense>
              </main>
            </div>
          </SidebarProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
