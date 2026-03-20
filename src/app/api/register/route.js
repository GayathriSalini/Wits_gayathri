import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, emailAddress, college, yearOfStudy, primaryDomain, whyInterested } = body;

    // Validate required fields
    if (!fullName || !emailAddress || !college || !yearOfStudy || !primaryDomain || !whyInterested) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const registrationId = `WIT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const registration = await prisma.registration.create({
      data: {
        name: fullName,
        email: emailAddress,
        college,
        yearOfStudy,
        domain: primaryDomain,
        whyInterested,
        registrationId,
      },
    });

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
