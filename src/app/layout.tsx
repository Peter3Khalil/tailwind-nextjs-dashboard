import { APP_FONT } from '@/app/constants';
import { META_DATA } from '@/app/constants/META_DATA';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import MyQueryClientProvider from '@/providers/query-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

export const metadata: Metadata = META_DATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-svh antialiased ${APP_FONT.className} w-full bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MyQueryClientProvider>
            <NextTopLoader showSpinner={false} color="#f97316" />
            {children}
            <Toaster />
          </MyQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
