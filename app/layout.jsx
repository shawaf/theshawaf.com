import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

//Components
import { Header } from "@/components/Header";
import PageTransitions from "@/components/PageTransitions";
import StairTransitions from "@/components/StairTransitions";

const jetbrainMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "shawaf.me",
  description: "Personal Website ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainMono.variable}>
        <Header />
        <StairTransitions />
        <PageTransitions>{children}</PageTransitions>
      </body>
    </html>
  );
}
