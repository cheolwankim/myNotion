import Sidebar from "@/components/layout/Sidebar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <div className="flex">
            <Suspense fallback={<div>사이드바 로딩 중...</div>}>
              <Sidebar /> {/* 여기서 useSession() 쓰고 있다면 Suspense로 감싸야 함 */}
            </Suspense>
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
