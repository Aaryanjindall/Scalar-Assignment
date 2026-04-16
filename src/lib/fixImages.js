const { Pool } = require('pg'); 
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL
}); 

const idToImage = {
  9: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=600&fit=crop', // Samsung
  10: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&h=600&fit=crop', // iPhone
  11: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=600&fit=crop', // Pixel
  12: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=600&fit=crop', // Nothing Phone
  13: 'https://images.unsplash.com/photo-1606144042871-2020b9914441?w=500&h=600&fit=crop', // PS5
  14: 'https://images.unsplash.com/photo-1621259182978-f2f01f80fd83?w=500&h=600&fit=crop', // Xbox
  15: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=600&fit=crop', // TV
  16: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&h=600&fit=crop', // TV 2
  17: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop', // Puma
  18: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=600&fit=crop', // Nike
  19: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop', // Jeans
  20: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=600&fit=crop', // Laptop
  21: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop', // Macbook
  22: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=600&fit=crop', // Smartwatch
  23: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop', // Backpack
  24: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=600&fit=crop', // Vacuum
  25: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500&h=600&fit=crop', // Appliance
  26: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=600&fit=crop', // Refrigerator
  27: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=600&fit=crop', // Mattress/bed
  28: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&h=600&fit=crop', // Chair
  29: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop', // Serum
  30: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=600&fit=crop', // Foundation
  31: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=600&fit=crop', // Lego
  32: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&h=600&fit=crop', // Toys
  33: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=600&fit=crop', // Sony Headphones
  34: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=600&fit=crop', // Chopper
  35: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500&h=600&fit=crop', // Kettle
  36: 'https://images.unsplash.com/photo-1613061527119-56ad37b8a581?w=500&h=600&fit=crop', // Bedsheet
};

const updateImages = async () => { 
  for (const [id, url] of Object.entries(idToImage)) {
    await pool.query('UPDATE products SET image_url=$1 WHERE id=$2', [url, parseInt(id)]); 
  } 
  console.log('Unique images updated successfully'); 
  pool.end(); 
}; 
updateImages().catch(e => console.error(e));
