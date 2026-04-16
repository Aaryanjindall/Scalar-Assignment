import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { phone_or_email, otp, name } = await request.json();

    if (!phone_or_email || !otp) {
      return NextResponse.json({ error: 'Phone/email and OTP are required' }, { status: 400 });
    }

    // In a real app we would verify OTP against a stored value/cache. Here we accept '1234'.
    if (otp !== '1234') {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
    }

    let user;
    const { rows } = await query('SELECT * FROM users WHERE phone_or_email = $1', [phone_or_email]);

    if (rows.length === 0) {
      // Create new user
      const insertRes = await query(
        'INSERT INTO users (phone_or_email, name) VALUES ($1, $2) RETURNING id, phone_or_email, name',
        [phone_or_email, name || 'New User']
      );
      user = insertRes.rows[0];
    } else {
      user = rows[0];
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        phone_or_email: user.phone_or_email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
