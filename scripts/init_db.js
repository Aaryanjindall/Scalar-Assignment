const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_Oj6Vlbp0WzSI@ep-crimson-shape-adu6np0z-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

async function initDB() {
  console.log('Initializing DB...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        phone_or_email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        discounted_price DECIMAL(10, 2),
        stock INTEGER NOT NULL DEFAULT 0,
        category VARCHAR(100),
        image_url VARCHAR(255),
        specs JSONB
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'PENDING',
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        product_id INTEGER REFERENCES products(id),
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      );
    `);

    const res = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(res.rows[0].count) === 0) {
      console.log('Seeding products...');
      await client.query(`
        INSERT INTO products (name, description, price, discounted_price, stock, category, image_url, specs) VALUES
        ('SAMSUNG Galaxy S24 Ultra 5G', 'Meet the Galaxy S24 Ultra, the ultimate smartphone experience.', 129999, 109999, 50, 'Mobiles', 'https://placehold.co/400x500/2874f0/ffffff.png?text=Galaxy+S24+Ultra', '{"RAM": "12 GB", "ROM": "256 GB", "Display": "6.8 inch Quad HD+", "Camera": "200MP"}'),
        ('Apple iPhone 15 (Blue, 128 GB)', 'Experience the power of the A16 Bionic.', 79900, 65999, 100, 'Mobiles', 'https://placehold.co/400x500/2874f0/ffffff.png?text=iPhone+15', '{"RAM": "6 GB", "ROM": "128 GB", "Display": "6.1 inch", "Camera": "48MP"}'),
        ('Google Pixel 8 Pro', 'Google AI and the best Pixel camera.', 106999, 99999, 30, 'Mobiles', 'https://placehold.co/400x500/2874f0/ffffff.png?text=Pixel+8+Pro', '{"RAM": "12 GB", "ROM": "128 GB", "Camera": "50MP Advanced"}'),
        ('Nothing Phone (2)', 'Come to the bright side.', 44999, 39999, 45, 'Mobiles', 'https://placehold.co/400x500/2874f0/ffffff.png?text=Nothing+Phone', '{"RAM": "12 GB", "ROM": "256 GB", "Interface": "Glyph"}'),
        ('SONY PlayStation 5 Console', 'Lightning-fast loading with SSD.', 54990, 44990, 20, 'Gaming', 'https://placehold.co/400x500/2874f0/ffffff.png?text=PS5+Console', '{"Storage": "825 GB", "Type": "Console", "Resolution": "8K, 4K"}'),
        ('Xbox Series X', 'Power your dreams.', 49990, 48990, 15, 'Gaming', 'https://placehold.co/400x500/107c10/ffffff.png?text=Xbox+Series+X', '{"Storage": "1 TB SSD", "Resolution": "4K Native"}'),
        ('LG 4K UHD Smart TV', 'Enjoy ultra detailed 4K.', 69990, 41990, 30, 'Electronics', 'https://placehold.co/400x500/fb641b/ffffff.png?text=LG+4K+TV', '{"Size": "55 inch", "Resolution": "4K", "Refresh": "60 Hz"}'),
        ('Samsung The Frame TV', 'TV when it''s on, Art when it''s off.', 89990, 74990, 10, 'Electronics', 'https://placehold.co/400x500/fb641b/ffffff.png?text=The+Frame+TV', '{"Size": "55 inch", "Type": "QLED"}'),
        ('PUMA Running Shoes', 'Comfortable mesh upper.', 3999, 1499, 200, 'Fashion', 'https://placehold.co/400x500/047857/ffffff.png?text=PUMA+Shoes', '{"Color": "Black", "Material": "Mesh"}'),
        ('Nike Air Max', 'Classic streetwear.', 8999, 6999, 100, 'Fashion', 'https://placehold.co/400x500/047857/ffffff.png?text=Nike+Air+Max', '{"Color": "White", "Sole": "Air"}'),
        ('Levi''s Original Fit Jeans', 'The classic straight fit.', 2999, 1599, 150, 'Fashion', 'https://placehold.co/400x500/047857/ffffff.png?text=Levis+Jeans', '{"Fit": "Regular", "Fabric": "Denim"}'),
        ('ASUS ROG Strix G15', 'Dominate your game.', 89990, 75990, 15, 'Laptops', 'https://placehold.co/400x500/212121/ffffff.png?text=ROG+Strix+G15', '{"CPU": "i7", "RAM": "16 GB", "Storage": "512 GB", "GPU": "RTX 3050"}'),
        ('Apple MacBook Air M2', 'Don''t take it lightly.', 114900, 104900, 40, 'Laptops', 'https://placehold.co/400x500/212121/ffffff.png?text=MacBook+Air+M2', '{"Chip": "M2", "RAM": "8 GB", "Storage": "256 GB SSD"}'),
        ('Noise ColorFit Pro 4', 'Smartwatch with sports modes.', 5999, 1999, 150, 'Electronics', 'https://placehold.co/400x500/fb641b/ffffff.png?text=Noise+Smartwatch', '{"Display": "1.72 inch", "Shape": "Rectangle"}'),
        ('Wildcraft Horizon Backpack', 'Spacious backpack.', 2599, 899, 300, 'Fashion', 'https://placehold.co/400x500/047857/ffffff.png?text=Wildcraft+Bag', '{"Capacity": "38 L", "Color": "Black"}'),
        ('Dyson V12 Detect Slim', 'Powerful intelligent vacuum.', 55900, 52900, 10, 'Appliances', 'https://placehold.co/400x500/878787/ffffff.png?text=Dyson+V12', '{"Type": "Cordless", "Weight": "2.2kg"}'),
        ('Philips Air Fryer XL', 'Healthy frying with Rapid Air.', 14995, 9999, 60, 'Appliances', 'https://placehold.co/400x500/878787/ffffff.png?text=Philips+Air+Fryer', '{"Capacity": "6.2 L", "Power": "2000 W"}'),
        ('Godrej 190L Refrigerator', 'Direct Cool Single Door.', 18990, 14490, 40, 'Appliances', 'https://placehold.co/400x500/878787/ffffff.png?text=Godrej+Fridge', '{"Capacity": "190 L", "Star": "3 Star"}'),
        ('Wakefit Orthopedic Mattress', 'Memory Foam with cover.', 15498, 11498, 25, 'Furniture', 'https://placehold.co/400x500/a855f7/ffffff.png?text=Wakefit+Mattress', '{"Size": "King", "Thickness": "8 inch"}'),
        ('Green Soul Ergonomic Chair', 'Gaming and Office Chair.', 19990, 13990, 80, 'Furniture', 'https://placehold.co/400x500/a855f7/ffffff.png?text=Green+Soul+Chair', '{"Material": "Breathable Mesh", "Warranty": "3 Years"}'),
        ('L\'Oreal Paris Serum', 'Hyaluronic Acid Revitalift.', 999, 799, 200, 'Beauty', 'https://placehold.co/400x500/ec4899/ffffff.png?text=LOreal+Serum', '{"Volume": "30 ml", "Type": "Face Serum"}'),
        ('Maybelline Fit Me Foundation', 'Matte + Poreless.', 699, 550, 250, 'Beauty', 'https://placehold.co/400x500/ec4899/ffffff.png?text=Fit+Me+Foundation', '{"Tone": "Warm", "Finish": "Matte"}'),
        ('LEGO Classic Creative Brick', 'Building Toys for Kids.', 4499, 3999, 120, 'Toys', 'https://placehold.co/400x500/eab308/ffffff.png?text=LEGO+Classic', '{"Pieces": "790", "AgeRange": "4-99"}'),
        ('Hot Wheels 5-Car Pack', 'Assorted die-cast vehicles.', 799, 699, 300, 'Toys', 'https://placehold.co/400x500/eab308/ffffff.png?text=Hot+Wheels', '{"Scale": "1:64", "Type": "Die-Cast"}'),
        ('Sony WH-1000XM5', 'Industry leading noise cancellation.', 34990, 29990, 50, 'Electronics', 'https://placehold.co/400x500/fb641b/ffffff.png?text=Sony+XM5', '{"Type": "Over-Ear", "Battery": "30 Hours"}'),
        ('Pigeon Chopper', 'Handy mini plastic chopper.', 495, 199, 500, 'Home', 'https://placehold.co/400x500/14b8a6/ffffff.png?text=Pigeon+Chopper', '{"Blades": "3", "Material": "Plastic"}'),
        ('Prestige Electric Kettle', '1.5 Litre with auto shut off.', 1245, 699, 400, 'Home', 'https://placehold.co/400x500/14b8a6/ffffff.png?text=Prestige+Kettle', '{"Capacity": "1.5L", "Power": "1500W"}'),
        ('Bombay Dyeing Bedsheet', '100% Cotton double bedsheet.', 2499, 999, 200, 'Home', 'https://placehold.co/400x500/14b8a6/ffffff.png?text=Bombay+Dyeing', '{"Size": "Double", "ThreadCount": "144"}')
      `);
    }

    const userRes = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(userRes.rows[0].count) === 0) {
      console.log('Seeding users...');
      await client.query(`
        INSERT INTO users (phone_or_email, name) VALUES
        ('test@example.com', 'Test User'),
        ('1234567890', 'Valid Mobile User')
      `);
    }

    await client.query('COMMIT');
    console.log('DB initialization successfully completed.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error during DB init:', e);
  } finally {
    client.release();
    pool.end();
  }
}

initDB();
