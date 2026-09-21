import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en", "de", "ja"],
  defaultLocale: "ko",
  localePrefix: "as-needed",
});
