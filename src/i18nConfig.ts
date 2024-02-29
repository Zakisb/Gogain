import { NextIntlConfig } from "next-intl";

interface MyIntlConfig extends NextIntlConfig {
  locales: string[];
  defaultLocale: string;
}

const i18nConfig: MyIntlConfig = {
  locales: ["en", "es", "fr"],
  defaultLocale: "fr",
};

export default i18nConfig;
