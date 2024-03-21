import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { authMiddleware } from "@clerk/nextjs";

let locales = ["en", "fr"];
let defaultLocale = "fr";

async function getLocale(request: Request) {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, locales, defaultLocale);
}
const intlMiddleware = async (request: NextRequest) => {
  // Step 1: Use the incoming request
  const locale = (await getLocale(request)) ?? defaultLocale;

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "fr", "es"],
    defaultLocale: locale,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", locale);

  return response;
};
// export default async function middleware

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // Ensure that locale specific sign-in pages are public
  // publicRoutes: ["/", "/:locale", "/:locale/sign-in", "/:locale/login"],
  ignoredRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
