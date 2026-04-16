const { Pool } = require('pg'); 
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL
}); 

const updateImages = async () => { 
  const { rows } = await pool.query('SELECT id, category FROM products'); 
  const cats = { 
    'Mobiles': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=600&fit=crop', 
    'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=600&fit=crop', 
    'Fashion': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop', 
    'Home': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=600&fit=crop', 
    'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=600&fit=crop', 
    'Appliances': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=600&fit=crop', 
    'Gaming': 'https://images.unsplash.com/photo-1606144042871-2020b9914441?w=500&h=600&fit=crop', 
    'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop' 
  }; 
  for (let row of rows) { 
    const url = cats[row.category] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop'; 
    await pool.query('UPDATE products SET image_url=$1 WHERE id=$2', [url, row.id]); 
  } 
  console.log('Images updated successfully'); 
  pool.end(); 
}; 
updateImages().catch(e => console.error(e));
