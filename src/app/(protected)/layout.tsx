import Chat from "@/components/chat/Chat";
import { Layout } from "@/components/layout";
import ThemeProvider from "@/providers/ThemeProvider";
import Providers from "@/providers/MessagesProvider";
import { unstable_setRequestLocale } from "next-intl/server";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // unstable_setRequestLocale(params.locale);

  return (
    <Providers>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Layout>
          <div className="flex h-full flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6 h-full ">
              <Chat />
              {children}
            </div>
          </div>
        </Layout>
      </ThemeProvider>
    </Providers>
  );
}
