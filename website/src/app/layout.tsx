import Footer from "@/blocks/Footer/Footer";
import Navigation from "@/blocks/Navigation/Navigation";
import { RegisterAnalytics } from "@/blocks/RegisterAnalytics/RegisterAnalytics";
import Sidebar from "@/blocks/Sidebar/Sidebar";
import { JSONLD } from "@/utility/ldjson";
import { Viewport } from "next";
import { Chatbot } from "../blocks/Chatbot/Chatbot";
import "./globals.scss";
import "./layout.scss";

export const viewport: Viewport = {
  themeColor: "#009688",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://clydedsouza.net/sitemap.xml"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <RegisterAnalytics />
        <Sidebar />
        <main>
          <Navigation />
          {children}
          <Footer />
        </main>
        <Chatbot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </body>
    </html>
  );
}
