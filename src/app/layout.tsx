import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import MyQueryClientProvider from '@/providers/query-client-provider';
import { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['italic', 'normal'],
  fallback: ['sans-serif'],
});
export const metadata: Metadata = {
  // metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-svh antialiased ${rubik.className} w-full`}>
        <MyQueryClientProvider>
          <NextTopLoader showSpinner={false} color="#f97316" />
          {children}
          <Toaster />
        </MyQueryClientProvider>
      </body>
    </html>
  );
}
