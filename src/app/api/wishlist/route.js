import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 1;

  try {
    const { rows } = await query(`
      SELECT p.* FROM products p 
      JOIN wishlist w ON p.id = w.product_id 
      WHERE w.user_id = $1
    `, [userId]);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { userId = 1, productId } = body;

  try {
    await query('INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, productId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 1;
  const productId = searchParams.get('productId');

  try {
    await query('DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
  }
}
