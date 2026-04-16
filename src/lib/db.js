import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_Oj6Vlbp0WzSI@ep-crimson-shape-adu6np0z-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

export const query = (text, params) => pool.query(text, params);
export default pool;