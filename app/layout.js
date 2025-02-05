
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Buymyoldphone",
  description: "BUymyoldphone is a auction website to sell your old phone or buy old phone ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
