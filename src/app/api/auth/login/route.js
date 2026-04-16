import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { phone_or_email } = await request.json();

    if (!phone_or_email) {
      return NextResponse.json({ error: 'Phone or email is required' }, { status: 400 });
    }

    // Check if user exists
    const { rows } = await query('SELECT * FROM users WHERE phone_or_email = $1', [phone_or_email]);
    let userExists = rows.length > 0;

    // Simulate OTP generation (always returns success in this clone)
    return NextResponse.json({ 
      message: 'OTP sent successfully', 
      userExists,
      mock_otp: '1234' // For testing purposes
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
