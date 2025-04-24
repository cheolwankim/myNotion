import Sidebar from "@/components/layout/Sidebar";
import "../styles/globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // ✅ default import

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
            <main className="flex-1">{children}</main>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
