import "@/styles/globals.css";
import type { Metadata } from "next";

import { Be_Vietnam_Pro } from "next/font/google";
import i18nConfig from "../../i18nConfig";
import { unstable_setRequestLocale } from "next-intl/server";

const BeVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoGain - Personal training and nutrition coaching",
  description: "B2B Saas for personal training and nutrition coaching",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={BeVietnamPro.className}>{children}</body>
    </html>
  );
}
