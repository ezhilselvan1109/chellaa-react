import * as React from "react";
import { ThemeScript } from "@chellaa/react";

export const metadata = {
  title: "Next.js App Router Consumer Test",
  description: "Regression testing @chellaa/react with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeScript defaultTheme="light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
