'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isLogin = pathname === '/login';

  return (
    <header className="w-full flex justify-between items-center py-6 px-8 max-w-7xl mx-auto z-10 relative">
      <div className="font-bold text-xl tracking-tight text-[#1A1A1A]">Women in Tech</div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-[#666666] items-center">
        {isLogin ? (
          <>
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors font-bold">Events</Link>
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors font-bold">Speakers</Link>
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors font-bold">About</Link>
          </>
        ) : (
          <>
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Events</Link>
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Schedule</Link>
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Speakers</Link>
          </>
        )}

        {isAdmin ? (
          <div className="flex items-center gap-4 ml-4">
            <Link href="/admin" className="text-[#CC5000] font-bold border-b-2 border-[#CC5000] pb-1">Admin</Link>
            <Link href="/" className="bg-[#EFEFEF] text-[#1A1A1A] px-5 py-2 rounded-full font-bold text-[13px] hover:bg-[#E5E5E5] transition-colors">
              Log Out
            </Link>
          </div>
        ) : isLogin ? (
          <Link href="/" className="bg-[#B34700] text-white px-6 py-2 rounded-full font-bold text-[13px] hover:bg-[#993D00] transition-colors ml-4 shadow-sm">
            Register
          </Link>
        ) : (
          <Link href="/login" className="bg-[#EFEFEF] text-[#1A1A1A] px-6 py-2 rounded-full font-bold text-sm hover:bg-[#E5E5E5] transition-colors ml-4">
            Admin Login
          </Link>
        )}
      </nav>
    </header>
  );
}
