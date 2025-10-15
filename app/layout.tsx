import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { WishlistProvider } from '@/context/WishListContext';
import { CartProvider } from '@/context/CartContext';
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from '@/context/ReactQueryProvider';
import Layout from '@/ui/Layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'junior seas',
  description: 'junior seas ecommerce platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <WishlistProvider>
            <CartProvider>
              <ToastContainer
                position="top-right"
                autoClose={1500}
                newestOnTop={true}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
              <Layout>{children}</Layout>
            </CartProvider>
          </WishlistProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
