const { Client } = require("pg");

// PostgreSQL 连接配置
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "stockSide",
  password: "1234",
  port: 5432,
});

async function createTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS stock_indices (
            id SERIAL PRIMARY KEY,
            index_name VARCHAR(50) NOT NULL,
            date DATE NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            UNIQUE (index_name, date)
        );
    `;
  await client.query(createTableQuery);
}

// 生成交易日
function generateBusinessDays(startDate, days) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (dates.length < days) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // 只选工作日
      dates.push(currentDate.toISOString().split("T")[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

// 生成指数
function generateStockData(indexName, startPrice, volatility, dates) {
  let price = startPrice;
  return dates.map((date) => {
    const changePercent = (Math.random() - 0.5) * volatility;
    price *= 1 + changePercent / 100;
    return { indexName, date, price: parseFloat(price.toFixed(2)) };
  });
}

// 插入資料
async function insertStockData(data) {
  const insertQuery = `
        INSERT INTO stock_indices (index_name, date, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (index_name, date) DO NOTHING;
    `;

  for (const record of data) {
    await client.query(insertQuery, [
      record.indexName,
      record.date,
      record.price,
    ]);
  }
  console.log("数据插入完成");
}

async function main() {
  try {
    await client.connect();
    // await createTable();

    const startDate = "2024-01-01";
    const businessDays = generateBusinessDays(startDate, 252);

    const stockData = [
      ...generateStockData("S&P 500", 4800, 1.5, businessDays),
      ...generateStockData("NASDAQ", 15000, 2, businessDays),
      ...generateStockData("Dow Jones", 36000, 1.2, businessDays),
    ];

    await insertStockData(stockData);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
