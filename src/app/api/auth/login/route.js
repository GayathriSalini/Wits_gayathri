import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminLoginSchema } from '@/lib/validations';
import { signToken } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const ip = getClientIp(request);
  const endpoint = '/api/auth/login';

  const rateCheck = checkRateLimit(ip, endpoint);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const validation = adminLoginSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  const { username, password } = validation.data;

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      logger.warn('Failed login - user not found', { username }, { endpoint, ip });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      logger.warn('Failed login - wrong password', { username }, { endpoint, ip });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ username: admin.username, role: 'admin' });

    logger.info('Admin login successful', { username }, { endpoint, ip });

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    logger.error('Login error', error, { endpoint, ip });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const ip = getClientIp(request);
  logger.info('Admin logout', undefined, { endpoint: '/api/auth/login', ip });
  
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete('admin_token');
  return response;
}
