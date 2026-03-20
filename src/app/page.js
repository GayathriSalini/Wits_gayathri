'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    college: '',
    yearOfStudy: '',
    primaryDomain: 'Tech',
    whyInterested: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDomainSelect = (domain) => {
    setFormData(prev => ({ ...prev, primaryDomain: domain }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const params = new URLSearchParams({
        name: formData.fullName,
        email: formData.emailAddress,
        domain: formData.primaryDomain,
        regId: data.registration.registrationId,
        date: new Date().toISOString(),
      });
      router.push(`/success?${params.toString()}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col pt-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-yc-gray-900 mb-6 font-sans">
            Women in Tech<br />
            <span className="text-[#CC5000]">— Event Registration</span>
          </h1>
          <p className="text-lg md:text-xl text-yc-gray-600 leading-relaxed font-medium">
            Join a community of innovators, builders, and future leaders. Secure your spot at the most anticipated technical summit of the year.
          </p>
        </div>

        {/* Avatars */}
        <div className="flex -space-x-4">
          <img className="w-12 h-12 rounded-full border-2 border-yc-gray-50 object-cover" src="https://i.pravatar.cc/150?img=5" alt="Avatar 1" />
          <img className="w-12 h-12 rounded-full border-2 border-yc-gray-50 object-cover" src="https://i.pravatar.cc/150?img=1" alt="Avatar 3" />
          <div className="w-12 h-12 rounded-full border-2 border-yc-gray-50 bg-[#E55A00] text-white flex items-center justify-center font-bold text-sm z-10">
            +2k
          </div>
        </div>
      </div>

      {/* Main Form container */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-24">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-2.5">
              <label className="text-[11px] font-bold tracking-widest text-yc-gray-800 uppercase">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Gayathri Salini"
                className="w-full bg-[#F4F4F4] border-none rounded-xl px-5 py-4 text-yc-gray-900 placeholder:text-yc-gray-400 focus:outline-none focus:ring-2 focus:ring-yc-orange/20 transition-all font-medium text-sm"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              <label className="text-[11px] font-bold tracking-widest text-yc-gray-800 uppercase">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="gayathriIITM@gmail.com"
                className="w-full bg-[#F4F4F4] border-none rounded-xl px-5 py-4 text-yc-gray-900 placeholder:text-yc-gray-400 focus:outline-none focus:ring-2 focus:ring-yc-orange/20 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-2.5">
              <label className="text-[11px] font-bold tracking-widest text-yc-gray-800 uppercase">College / University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Indian Institute of Technology Madras"
                className="w-full bg-[#F4F4F4] border-none rounded-xl px-5 py-4 text-yc-gray-900 placeholder:text-yc-gray-400 focus:outline-none focus:ring-2 focus:ring-yc-orange/20 transition-all font-medium text-sm"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              <label className="text-[11px] font-bold tracking-widest text-yc-gray-800 uppercase">Year of Study</label>
              <div className="relative">
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full bg-[#F4F4F4] border-none rounded-xl px-5 py-4 text-yc-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-yc-orange/20 transition-all font-medium text-sm"
                >
                  <option value="" disabled>Select your year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>

                </select>
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[11px] font-bold tracking-widest text-yc-gray-800 uppercase">Primary Domain</label>
            <div className="flex bg-[#F4F4F4] rounded-xl p-1.5 relative">
              <button
                type="button"
                onClick={() => handleDomainSelect('Tech')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all shadow-sm ${formData.primaryDomain === 'Tech'
                  ? 'bg-white text-yc-gray-900'
                  : 'text-yc-gray-500 hover:text-yc-gray-800 shadow-none'
                  }`}
              >
                Tech
              </button>
              <button
                type="button"
                onClick={() => handleDomainSelect('Non-Tech')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all shadow-sm ${formData.primaryDomain === 'Non-Tech'
                  ? 'bg-white text-yc-gray-900'
                  : 'text-yc-gray-500 hover:text-yc-gray-800 shadow-none'
                  }`}
              >
                Non-Tech
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[11px] font-bold tracking-widest text-yc-gray-800 uppercase">Why are you interested?</label>
            <textarea
              name="whyInterested"
              value={formData.whyInterested}
              onChange={handleChange}
              placeholder="Tell us what you hope to achieve..."
              rows={4}
              className="w-full bg-[#F4F4F4] border-none rounded-xl px-5 py-4 text-yc-gray-900 placeholder:text-yc-gray-400 focus:outline-none focus:ring-2 focus:ring-yc-orange/20 transition-all font-medium resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E55A00] hover:bg-[#CC5000] text-white rounded-xl py-4 font-bold transition-all mt-4 shadow-[0_4px_14px_0_rgba(229,90,0,0.39)] hover:shadow-[0_6px_20px_rgba(229,90,0,0.23)] hover:-translate-y-0.5 transform duration-200 text-[15px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register for the Event'}
          </button>

          <p className="text-[9px] text-center text-yc-gray-400 font-bold tracking-widest uppercase mt-4">
            Limited seats available. Registration closes in 48 hours.
          </p>
        </form>
      </div>

      {/* Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Network */}
        <div className="bg-[#F6F5F0] rounded-3xl p-8 flex flex-col gap-4">
          <div className="mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC5000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-[1.35rem] font-bold text-yc-gray-900">Network</h3>
          <p className="text-[13px] text-yc-gray-600 leading-relaxed font-medium">Connect with 500+ female tech leaders and peers from top universities globally.</p>
        </div>

        {/* Learn */}
        <div className="bg-[#F6F5F0] rounded-3xl p-8 flex flex-col gap-4">
          <div className="mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC5000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h3 className="text-[1.35rem] font-bold text-yc-gray-900">Learn</h3>
          <p className="text-[13px] text-yc-gray-600 leading-relaxed font-medium">Hands-on workshops in AI, System Design, and Product Management led by experts.</p>
        </div>

        {/* Build */}
        <div className="bg-[#F6F5F0] rounded-3xl p-8 flex flex-col gap-4">
          <div className="mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC5000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </div>
          <h3 className="text-[1.35rem] font-bold text-yc-gray-900">Build</h3>
          <p className="text-[13px] text-yc-gray-600 leading-relaxed font-medium">Participate in our signature 12-hour build-a-thon and win exclusive mentorship slots.</p>
        </div>
      </div>
    </div>
  );
}
