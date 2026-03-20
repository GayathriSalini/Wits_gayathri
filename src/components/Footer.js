'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isLogin = pathname === '/login';

  return (
    <footer className={`w-full ${isLogin ? 'border-t-0' : 'border-t border-[#EAEAEA]'} mt-auto py-8 px-8 flex justify-between flex-col md:flex-row gap-6 md:gap-0 items-center text-xs text-[#666666] max-w-7xl mx-auto font-medium z-10 relative`}>


      <div className="font-bold tracking-normal text-sm text-[#1A1A1A]">Made by GAYATHRI</div>


      <div className={`flex gap-6 ${!isLogin ? 'uppercase' : ''}`}>
        <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</Link>
        <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</Link>
        <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Contact Support</Link>
      </div>

      {!isAdmin && !isLogin && <div className="tracking-widest uppercase">© 2026 WOMEN IN TECH</div>}
    </footer>
  );
}
