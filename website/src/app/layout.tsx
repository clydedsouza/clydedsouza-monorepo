import Footer from "@/blocks/Footer/Footer";
import Navigation from "@/blocks/Navigation/Navigation";
import { RegisterAnalytics } from "@/blocks/RegisterAnalytics/RegisterAnalytics";
import Sidebar from "@/blocks/Sidebar/Sidebar";
import type { Metadata } from "next";
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
      <body>
        <RegisterAnalytics />
        <Sidebar />
        <main>
          <Navigation />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
