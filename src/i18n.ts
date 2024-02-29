import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import i18nConfig from "./i18nConfig";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18nConfig.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}/translation.json`)).default,
  };
});
