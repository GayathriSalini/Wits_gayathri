import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Women in Tech - Event Registration',
  description: 'Join a community of innovators, builders, and future leaders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F8F7F2] text-[#1A1A1A]`}>
        <Header />
        <main className="flex-1 flex flex-col w-full px-8 py-8 max-w-7xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
