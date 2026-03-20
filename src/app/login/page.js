'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/admin');
  };
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative -mt-4 pb-20 overflow-x-hidden">
      {/* Background gradients */}
      <div className="absolute top-[10%] -left-64 w-[600px] h-[600px] bg-[#FFF0E5] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none -z-10"></div>
      <div className="absolute top-[5%] -right-48 w-[500px] h-[500px] bg-[#FFF4EC] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none -z-10"></div>

      {/* Headers */}
      <h1 className="text-[2.75rem] md:text-[3.25rem] font-bold text-[#1A1A1A] mb-3 tracking-tight text-center">
        Welcome Back
      </h1>
      <p className="text-[#666666] text-[15px] md:text-[16px] font-medium text-center max-w-md mb-10 leading-relaxed px-4">
        Sign in to access the Women in Tech portal and connect with the community.
      </p>

      {/* Form Card */}
      <div className="w-full max-w-[26rem] bg-white rounded-[1.25rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative z-10 mx-4">
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">Username</label>
            <input
              type="text"
              placeholder="username"
              className="w-full bg-[#F6F5F0] border border-transparent focus:bg-white focus:border-[#EAEAEA] rounded-xl px-4 py-3.5 text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:ring-4 focus:ring-[#CC5000]/10 transition-all font-medium text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">Password</label>
              <a href="#" className="text-[11px] font-bold text-[#CC5000] hover:text-[#E55A00] transition-colors">Forgot Password?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#F6F5F0] border border-transparent focus:bg-white focus:border-[#EAEAEA] rounded-xl px-4 py-3.5 text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:ring-4 focus:ring-[#CC5000]/10 transition-all font-medium text-[14px] tracking-widest"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E55A00] hover:bg-[#CC5000] text-white rounded-full py-3.5 font-bold transition-colors shadow-[0_4px_14px_0_rgba(229,90,0,0.39)] hover:shadow-[0_6px_20px_rgba(229,90,0,0.23)] hover:-translate-y-0.5 transform duration-200 text-[15px] mt-2 mb-2"
          >
            Sign In
          </button>

          <div className="w-full h-px bg-[#F4F4F4] my-1"></div>

          <p className="text-center text-[13px] font-medium text-[#666666]">
            New here? <a href="/" className="font-bold text-[#CC5000] hover:text-[#E55A00] transition-colors">Create an account</a>
          </p>

          <div className="mt-2 text-center">
            <a href="/admin" className="text-[10px] font-bold tracking-widest text-[#999999] hover:text-[#666666] uppercase transition-colors">
              Admin Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
