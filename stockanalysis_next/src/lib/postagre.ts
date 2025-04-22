import { Client } from "pg";

const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "stockSide",
  password: process.env.DB_PASSWORD || "1234",
  port: Number(process.env.DB_PORT) || 5432,
});

const executeQuery = async (query: string, values: any[] = []) => {
  try {
    await client.connect();
    const res = await client.query(query, values);
    return res.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    await client.end(); // 关闭连接
  }
};

export default executeQuery;
