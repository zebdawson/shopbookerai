import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "AutoRepair AI Dashboard",
  description: "Professional dashboard for auto repair shop owners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <div className="container mx-auto p-6 lg:p-8 pt-20 lg:pt-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
