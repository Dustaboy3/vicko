"use client";

import { ThemeProvider } from "next-themes";
import "../globals.css";
import '@mantine/core/styles.css';
import ThemeProviderMantine from "@/providers/matnineProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <html lang="eng">
        <body className={`dark:bg-black`}>
          <ThemeProviderMantine>
            <ThemeProvider enableSystem={false} attribute="class" defaultTheme="dark">
              {children}
            </ThemeProvider>
          </ThemeProviderMantine>
        </body>
      </html>
    </>
  );
}
