import Chat from "@/components/chat/Chat";
import { Layout } from "@/components/layout";
import ThemeProvider from "@/providers/ThemeProvider";
import Providers from "@/providers/MessagesProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Layout>
        <div className="flex h-full flex-col ">
          <div className="flex-1 space-y-4 p-8 pt-6 h-full ">
            <Chat />
            {children}
          </div>
        </div>
      </Layout>
    </Providers>
  );
}
