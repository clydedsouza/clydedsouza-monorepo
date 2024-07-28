import Footer from "@/blocks/Footer/Footer";
import Navigation from "@/blocks/Navigation/Navigation";
import { RegisterAnalytics } from "@/blocks/RegisterAnalytics/RegisterAnalytics";
import Sidebar from "@/blocks/Sidebar/Sidebar";
import { JSONLD } from "@/utility/ldjson";
import "./globals.scss";
import "./layout.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NODE_ENV);
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
      <body>
        <RegisterAnalytics />
        <Sidebar />
        <main>
          <Navigation />
          {children}
          <Footer />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </body>
    </html>
  );
}
