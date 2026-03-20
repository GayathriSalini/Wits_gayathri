import { PrismaClient } from '@prisma/client';
import AttendeeTable from '../../components/AttendeeTable';

// Prevent Next.js from caching the database results statically
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const prisma = new PrismaClient();
  const dbAttendees = await prisma.registration.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalRegistrations = dbAttendees.length;
  const techCount = dbAttendees.filter(a => a.domain === 'Tech').length;
  const techPercentage = totalRegistrations > 0 ? Math.round((techCount / totalRegistrations) * 100) : 0;
  const nonTechPercentage = totalRegistrations > 0 ? 100 - techPercentage : 0;

  // Year of study breakdown
  const yearCounts = { '1': 0, '2': 0, '3': 0, '4': 0, 'other': 0 };
  dbAttendees.forEach(a => {
    if (['1', '2', '3', '4'].includes(a.yearOfStudy)) {
      yearCounts[a.yearOfStudy]++;
    } else {
      yearCounts['other']++;
    }
  });
  const yr1Pct = totalRegistrations > 0 ? Math.round((yearCounts['1'] / totalRegistrations) * 100) : 0;
  const yr2Pct = totalRegistrations > 0 ? Math.round((yearCounts['2'] / totalRegistrations) * 100) : 0;
  const yr3Pct = totalRegistrations > 0 ? Math.round((yearCounts['3'] / totalRegistrations) * 100) : 0;
  const yr4Pct = totalRegistrations > 0 ? Math.round((yearCounts['4'] / totalRegistrations) * 100) : 0;
  const yrOtherPct = totalRegistrations > 0 ? 100 - yr1Pct - yr2Pct - yr3Pct - yr4Pct : 0;

  const attendees = dbAttendees.map((a, i) => ({
    name: a.name,
    email: a.email,
    college: a.college,
    year: `${a.yearOfStudy}${['1', '2', '3', '4'].includes(a.yearOfStudy) ? ' Year' : ''}`,
    domain: a.domain === 'Tech' ? 'TECH' : 'NON-TECH',
    domainCol: a.domain === 'Tech' ? 'bg-blue-100 text-[#0066CC]' : 'bg-orange-100 text-[#CC5000]',
    status: 'Confirmed'
  }));

  return (
    <div className="w-full flex-1 flex flex-col pt-4 pb-12 overflow-x-hidden">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-[2.2rem] font-bold text-[#1A1A1A] mb-2 tracking-tight">Event Analytics</h1>
          <p className="text-[#666666] font-medium text-[15px]">Real-time registration tracking and attendee breakdown.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#E55A00] hover:bg-[#CC5000] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-[0_4px_14px_0_rgba(229,90,0,0.39)] hover:shadow-[0_6px_20px_rgba(229,90,0,0.23)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Event
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        
        {/* TOTAL REGISTRATIONS */}
        <div className="bg-white rounded-[1.25rem] p-6 shadow-sm flex flex-col justify-between h-[180px] border border-[#EAEAEA]">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-[#FFF2EA] rounded-xl flex items-center justify-center text-[#CC5000]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div className="bg-[#D1FAE5] text-[#047857] font-bold text-[10px] px-2.5 py-1 rounded-full">
              LIVE DATABASE
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#999999] uppercase mb-1">TOTAL REGISTRATIONS</p>
            <p className="text-5xl font-black text-[#1A1A1A] tracking-tight">{totalRegistrations}</p>
          </div>
        </div>

        {/* TECH VS NON-TECH */}
        <div className="bg-white rounded-[1.25rem] p-6 shadow-sm flex flex-col justify-center h-[180px] border border-[#EAEAEA]">
          <p className="text-[10px] font-bold tracking-widest text-[#999999] uppercase mb-6">TECH VS NON-TECH</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-xs font-bold text-[#1A1A1A] mb-2">
              <span>Tech Roles</span>
              <span className="text-[#CC5000] text-sm">{techPercentage}%</span>
            </div>
            <div className="w-full bg-[#EFEFEF] rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#CC5000] h-2.5 rounded-full" style={{ width: `${techPercentage}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#1A1A1A] mb-2">
              <span>Non-Tech</span>
              <span className="text-[#999999] text-sm">{nonTechPercentage}%</span>
            </div>
            <div className="w-full bg-[#EFEFEF] rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#999999] h-2.5 rounded-full" style={{ width: `${nonTechPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* YEAR OF STUDY */}
        <div className="bg-white rounded-[1.25rem] p-6 shadow-sm flex items-center justify-between h-[180px] border border-[#EAEAEA] gap-4">
          <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center shrink-0"
            style={{ background: totalRegistrations > 0 ? `conic-gradient(#0066CC 0% ${yr1Pct}%, #FF8533 ${yr1Pct}% ${yr1Pct + yr2Pct}%, #CC5000 ${yr1Pct + yr2Pct}% ${yr1Pct + yr2Pct + yr3Pct}%, #10B981 ${yr1Pct + yr2Pct + yr3Pct}% ${yr1Pct + yr2Pct + yr3Pct + yr4Pct}%, #999999 ${yr1Pct + yr2Pct + yr3Pct + yr4Pct}% 100%)` : '#EFEFEF' }}>
            <div className="w-[75px] h-[75px] bg-white rounded-full flex items-center justify-center shadow-inner">
              <span className="text-[10px] font-bold text-[#666666]">Years</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pl-4 border-l border-[#EFEFEF] flex-1">
            <p className="text-[10px] font-bold tracking-widest text-[#999999] uppercase mb-1">YEAR OF STUDY</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0066CC] shrink-0"></div>
              <span className="text-[11px] font-medium text-[#1A1A1A] leading-tight">1st Year ({yr1Pct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF8533] shrink-0"></div>
              <span className="text-[11px] font-medium text-[#1A1A1A] leading-tight">2nd Year ({yr2Pct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#CC5000] shrink-0"></div>
              <span className="text-[11px] font-medium text-[#1A1A1A] leading-tight">3rd Year ({yr3Pct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] shrink-0"></div>
              <span className="text-[11px] font-medium text-[#1A1A1A] leading-tight">4th Year ({yr4Pct}%)</span>
            </div>
            {yrOtherPct > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#999999] shrink-0"></div>
                <span className="text-[11px] font-medium text-[#1A1A1A] leading-tight">Other ({yrOtherPct}%)</span>
              </div>
            )}
          </div>
        </div>

      </div>

      <AttendeeTable initialAttendees={attendees} totalRegistrations={totalRegistrations} />
    </div>
  );
}
