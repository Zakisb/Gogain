import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

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

export default authMiddleware({
  // beforeAuth(request) {
  //   return intlMiddleware(request);
  // },
  // debug: true,
  ignoredRoutes: ["/:locale/create-account", "/api/webhooks(.*)"],
  // Ensure that locale-specific sign in pages are public
  publicRoutes: [
    "/:locale",
    "/:locale/login",
    "/api/webhooks(.*)",
    "/api/meal-plan",
  ],
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
