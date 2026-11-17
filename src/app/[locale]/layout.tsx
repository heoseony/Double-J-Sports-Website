import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Double J Sports Academy",
  description: "더블제이스포츠 아카데미 - 프랑크푸르트/뒤셀도르프 축구 아카데미",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="dj-embed" strategy="beforeInteractive">
          {"try{var d=document.documentElement,p=location.pathname,m=p.match(/^\\/(en|de|ja)(\\/.*)?$/),l=m?'/'+m[1]:'',r=m?(m[2]||'/'):p;if(self!==top){d.classList.add('dj-embed');if(r==='/'||r==='')top.location.replace(l+'/')}else if(r!=='/'&&r!==''&&r.indexOf('admin')<0){location.replace(l+'/?panel='+encodeURIComponent(r+location.hash))}}catch(e){}"}
        </Script>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
