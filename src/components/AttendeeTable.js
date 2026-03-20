'use client';
import { useState } from 'react';

export default function AttendeeTable({ initialAttendees, totalRegistrations }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All Domains');

  const filteredAttendees = initialAttendees.filter(attendee => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (attendee.college && attendee.college.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDomain =
      domainFilter === 'All Domains' ||
      (domainFilter === 'Tech' && attendee.domain === 'TECH') ||
      (domainFilter === 'Non-Tech' && attendee.domain === 'NON-TECH');

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="w-full bg-[#FCFBF8] border border-[#EFEFEF] rounded-2xl overflow-hidden mb-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 border-b border-[#EAEAEA] bg-[#FAF9F5]">
        <div className="flex-1 bg-white rounded-xl flex items-center px-4 py-3 w-full shadow-sm border border-[#EAEAEA]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full text-sm font-medium focus:outline-none placeholder:text-[#999999] text-[#1A1A1A]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-white rounded-xl flex items-center px-4 py-3 min-w-[160px] shadow-sm relative border border-[#EAEAEA]">
          <select
            className="w-full text-sm font-bold appearance-none bg-transparent focus:outline-none text-[#1A1A1A] cursor-pointer"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="All Domains">All Domains</option>
            <option value="Tech">Tech</option>
            <option value="Non-Tech">Non-Tech</option>
          </select>
          <div className="absolute right-4 pointer-events-none text-[#999999]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EAEAEA]">
              <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-[#999999] uppercase">ATTENDEE NAME</th>
              <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-[#999999] uppercase">EMAIL</th>
              <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-[#999999] uppercase">COLLEGE</th>
              <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-[#999999] uppercase">YEAR</th>
              <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-[#999999] uppercase">DOMAIN</th>
              <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-[#999999] uppercase">STATUS</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredAttendees.length > 0 ? filteredAttendees.map((a, i) => (
              <tr key={i} className={`hover:bg-[#FCFBF8] transition-colors ${i !== filteredAttendees.length - 1 ? 'border-b border-[#EAEAEA]' : ''}`}>
                <td className="py-5 px-6 font-bold text-sm text-[#1A1A1A]">{a.name}</td>
                <td className="py-5 px-6 text-sm font-medium text-[#666666]">{a.email}</td>
                <td className="py-5 px-6 text-sm font-medium text-[#666666]">{a.college || '-'}</td>
                <td className="py-5 px-6 text-sm text-[#666666] font-medium">{a.year}</td>
                <td className="py-5 px-6">
                  <span className={`text-[9.5px] font-black tracking-widest uppercase px-2 py-1 rounded bg-opacity-20 ${a.domainCol}`}>
                    {a.domain}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${a.status === 'Confirmed' ? 'bg-[#10B981]' : 'bg-[#CC5000]'}`}></div>
                    <span className={`text-[12px] font-bold ${a.status === 'Confirmed' ? 'text-[#10B981]' : 'text-[#CC5000]'}`}>{a.status}</span>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#999999] text-sm font-medium">
                  {searchTerm || domainFilter !== 'All Domains' ? 'No attendees match your criteria.' : 'No registrations yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer (Static for now) */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#FCFBF8] border-t border-[#EAEAEA]">
        <span className="text-xs font-medium text-[#666666]">
          Showing {filteredAttendees.length} of {totalRegistrations} attendees
        </span>
        <div className="flex gap-2">
          <button disabled className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-[0_1px_3px_rgba(0,0,0,0.05)] font-bold text-[#1A1A1A] opacity-50 cursor-not-allowed border border-[#EAEAEA]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button disabled className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-[0_1px_3px_rgba(0,0,0,0.05)] font-bold text-[#1A1A1A] opacity-50 cursor-not-allowed border border-[#EAEAEA]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
