import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 1; // Default mocked user

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      return NextResponse.json(rows);
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { userId = 1, items, totalAmount, shippingAddress } = body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const orderRes = await client.query(
        'INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES ($1, $2, $3, $4) RETURNING id',
        [userId, totalAmount, 'PLACED', shippingAddress]
      );
      const orderId = orderRes.rows[0].id;

      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, item.id, item.quantity, item.price]
        );
      }

      await client.query('COMMIT');
      return NextResponse.json({ success: true, orderId });
    } catch (e) {
      await client.query('ROLLBACK');
      console.error(e);
      return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
