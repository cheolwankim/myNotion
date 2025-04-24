import Sidebar from "@/components/layout/Sidebar";
import "../styles/globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <div className="flex">
            <Sidebar />
            {/* 👇 Suspense로 children 전체 감싸기 */}
            <main className="flex-1">
              <Suspense fallback={<div>로딩 중...</div>}>
                {children}
              </Suspense>
            </main>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
