import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ProviderSocket } from "@/socket";
import { Provider } from "@/shared";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["400", "100", "500", "700", "900"],
  variable: "--font-aladin",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Provider>
          <ProviderSocket>{children}</ProviderSocket>
        </Provider>
      </body>
    </html>
  );
}
