import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69cb2672a7654b8774320f18" />
        <meta
          name="talentapp:project_verification"
          content="d598ec2ff90288b3ca551148f41b8750d35c6338585838b49e7a901843a4669880e67a8a9fc22c005fbeda23910bcd62e9072018bb11f2a169e909d899f5bfc9"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LuckyBlock Dice</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
