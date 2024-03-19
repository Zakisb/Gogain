"use client";
import { Layout } from "@/components/layout";
import AuthContext from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContext>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Layout>
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 h-full">{children}</div>
          </div>
        </Layout>
      </ThemeProvider>
    </AuthContext>
  );
}
