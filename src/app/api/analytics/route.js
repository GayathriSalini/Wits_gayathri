import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

export async function GET(request) {
  const ip = getClientIp(request);
  const endpoint = '/api/analytics';

  const rateCheck = checkRateLimit(ip, endpoint);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const isAdmin = await isAdminAuthenticated(request);
  if (!isAdmin) {
    logger.warn('Unauthorized access to analytics', undefined, { endpoint, ip });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [total, techCount, nonTechCount, byCollege, byYear, recentRegistrations] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { domain: 'Tech' } }),
      prisma.registration.count({ where: { domain: 'Non-Tech' } }),
      prisma.registration.groupBy({
        by: ['college'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
      prisma.registration.groupBy({
        by: ['yearOfStudy'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
      prisma.registration.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          name: true,
          college: true,
          domain: true,
          createdAt: true,
          registrationId: true,
        },
      }),
    ]);

    const techPercent = total > 0 ? Math.round((techCount / total) * 100) : 0;
    const nonTechPercent = total > 0 ? Math.round((nonTechCount / total) * 100) : 0;

    logger.info('Analytics fetched', { total }, { endpoint, ip });

    return NextResponse.json({
      success: true,
      data: {
        total,
        byDomain: {
          Tech: { count: techCount, percent: techPercent },
          'Non-Tech': { count: nonTechCount, percent: nonTechPercent },
        },
        byCollege: byCollege.map((c) => ({ college: c.college, count: c._count.id })),
        byYear: byYear.map((y) => ({ year: y.yearOfStudy, count: y._count.id })),
        recentRegistrations,
      },
    });
  } catch (error) {
    logger.error('Analytics fetch error', error, { endpoint, ip });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
