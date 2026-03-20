import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

export async function GET(request) {
  const ip = getClientIp(request);
  const endpoint = '/api/registrations';

  // Rate limiting
  const rateCheck = checkRateLimit(ip, endpoint);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Check admin auth
  const isAdmin = await isAdminAuthenticated(request);
  if (!isAdmin) {
    logger.warn('Unauthorized access to registrations', undefined, { endpoint, ip });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const college = searchParams.get('college');
  const domain = searchParams.get('domain');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
  const skip = (page - 1) * pageSize;

  // Build where clause
  const where = {};

  if (college && college !== 'all') {
    where.college = college;
  }

  if (domain && domain !== 'all') {
    where.domain = domain;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          college: true,
          yearOfStudy: true,
          domain: true,
          registrationId: true,
          createdAt: true,
        },
      }),
      prisma.registration.count({ where }),
    ]);

    logger.info(`Fetched ${registrations.length} registrations`, { total, page }, { endpoint, ip });

    return NextResponse.json({
      success: true,
      data: registrations,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    logger.error('Database error fetching registrations', error, { endpoint, ip });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
