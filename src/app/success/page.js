'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Attendee';
  const email = searchParams.get('email') || 'email@example.com';
  const domain = searchParams.get('domain') || 'Tech';
  const regId = searchParams.get('regId') || 'WIT-XXXXXX';
  const dateStr = searchParams.get('date');
  
  const registeredDate = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = registeredDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = registeredDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center pt-16 pb-24">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-[#FFF2EA] rounded-full flex items-center justify-center mb-8">
        <div className="w-8 h-8 bg-[#E55A00] rounded-full flex items-center justify-center text-white">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6667 1L5.5 10.1667L1.33333 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-4xl md:text-5xl font-bold text-yc-gray-900 mb-4 tracking-tight text-center">
        You're Registered 🎉
      </h1>
      <p className="text-yc-gray-600 text-[15px] font-medium text-center max-w-xl mb-12 leading-relaxed">
        We've reserved your spot. Get ready to connect with the most ambitious women in the startup ecosystem.
      </p>

      {/* Ticket Card */}
      <div className="w-full max-w-[42rem] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative border border-yc-gray-100 flex flex-col md:flex-row mb-12">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF2EA] rounded-bl-[100px] opacity-40 -z-0"></div>

        {/* Left Column */}
        <div className="flex-1 p-8 md:p-10 relative z-10">
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-widest text-yc-gray-400 uppercase mb-2">Attendee</p>
            <p className="text-2xl font-bold text-yc-gray-900 leading-tight">{name}</p>
            <p className="text-[13px] text-yc-gray-600">{email}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-widest text-yc-gray-400 uppercase mb-2.5">Focus Domain</p>
            <div className="inline-block bg-[#EFEFEF] text-yc-gray-800 text-[13px] font-bold px-4 py-1.5 rounded-lg shadow-sm">
              {domain}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-yc-gray-100 my-8"></div>
        <div className="md:hidden h-px bg-yc-gray-100 mx-8"></div>

        {/* Right Column */}
        <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-widest text-yc-gray-400 uppercase mb-2">Registration ID</p>
            <p className="text-[1.75rem] font-black text-[#CC5000] tracking-tight mb-1">{regId}</p>
            <p className="text-[11px] text-yc-gray-500 italic max-w-[180px] leading-tight">
              Please present this ID at the venue entrance.
            </p>
          </div>

          <a href="/" className="inline-block w-full text-center bg-[#E55A00] hover:bg-[#CC5000] text-white rounded-xl py-3.5 font-bold transition-colors shadow-[0_4px_14px_0_rgba(229,90,0,0.39)] hover:shadow-[0_6px_20px_rgba(229,90,0,0.23)] hover:-translate-y-0.5 transform duration-200 text-sm">
            Register Another
          </a>
        </div>
      </div>

      {/* Event Info */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CC5000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="font-bold text-yc-gray-800 text-sm">Registered on {formattedDate} at {formattedTime}</span>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="w-full flex-1 flex items-center justify-center">
        <p className="text-yc-gray-500 font-medium">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
