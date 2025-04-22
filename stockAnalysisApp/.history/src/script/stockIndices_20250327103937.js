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
        open DECIMAL(10, 2) NOT NULL,
        close DECIMAL(10, 2) NOT NULL,
        high DECIMAL(10, 2) NOT NULL,
        low DECIMAL(10, 2) NOT NULL,
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
      // 剔除六日
      dates.push(currentDate.toISOString().split("T")[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

// 生成指数
function generateStockData(indexName, startPrice, volatility, dates) {
  let lastClose = startPrice;
  return dates.map((date) => {
    const open = lastClose;
    const close = open * (1 + ((Math.random() - 0.5) * volatility) / 100);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);

    lastClose = close;

    return {
      indexName,
      date,
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
    };
  });
}

// 插入資料
async function insertStockData(data) {
  const insertQuery = `
    INSERT INTO stock_indices (index_name, date, open, close, high, low)
    VALUES ($1, $2, $3, $4, $5, $6)
`;

  for (const record of data) {
    await client.query(insertQuery, [
      record.indexName,
      record.date,
      record.open,
      record.close,
      record.high,
      record.low,
    ]);
  }
  console.log("資料寫入完成");
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
