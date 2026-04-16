import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const category = searchParams.get('category');

  try {
    let sql = 'SELECT * FROM products';
    const params = [];

    const conditions = [];
    if (search) {
      conditions.push(`name ILIKE $${params.length + 1}`);
      params.push(`%${search}%`);
    }
    if (category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    const { rows } = await query(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, description, price, category, stock, image_url, specs } = data;

    if (!name || !price || !category) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    const sql = `
      INSERT INTO products (name, description, price, category, stock, image_url, specs)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const params = [
      name, 
      description || '', 
      price, 
      category, 
      stock || 10, 
      image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop', 
      specs || {}
    ];

    const { rows } = await query(sql, params);
    return NextResponse.json({ success: true, product: rows[0] });
  } catch (error) {
    console.error('Failed to add product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
