import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodMart - We delivered the best.',
  description: 'Your favorite meals is our priority.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
