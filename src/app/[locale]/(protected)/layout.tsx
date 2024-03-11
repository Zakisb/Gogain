"use client";
import { Layout } from "@/components/layout";
import Providers from "@/providers/ThemeProvider";
import AuthContext from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContext>
      <Providers>
        <Layout>
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
          </div>
        </Layout>
      </Providers>
    </AuthContext>
  );
}
