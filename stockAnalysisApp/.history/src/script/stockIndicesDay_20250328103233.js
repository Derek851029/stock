const { Client } = require("pg");

// PostgreSQL 连接配置
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "stockSide",
  password: "1234",
  port: 5432,
});

async function createTradeTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS stock_indices_trades (
            id SERIAL PRIMARY KEY,
            index_name VARCHAR(50) NOT NULL,
            timestamp TIMESTAMP NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            volume INT NOT NULL,
            UNIQUE (index_name, timestamp)
        );
    `;
  await client.query(createTableQuery);
}

// 生成交易
function generateTradingTimestamps(date, intervalMinutes = 1) {
  const timestamps = [];
  let startTime = new Date(`${date}T09:30:00`);
  const endTime = new Date(`${date}T16:00:00`);

  while (startTime <= endTime) {
    timestamps.push(new Date(startTime).toISOString());
    startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
  }
  return timestamps;
}

function generateTradeData(
  indexName,
  openPrice,
  closePrice,
  volatility,
  date,
  intervalMinutes = 1
) {
  const timestamps = generateTradingTimestamps(date, intervalMinutes);
  const data = [];

  let lastPrice = openPrice;
  const priceStep = (closePrice - openPrice) / timestamps.length;

  timestamps.forEach((timestamp, i) => {
    // 模擬價格波動
    const randomFluctuation = (Math.random() - 0.5) * volatility;
    let price = lastPrice + priceStep + randomFluctuation;
    price = parseFloat(price.toFixed(2));

    // 隨機交易量
    const volume = Math.floor(Math.random() * 1000) + 500;

    data.push({
      indexName,
      timestamp,
      price,
      volume,
    });

    lastPrice = price;
  });

  return data;
}

// 插入交易数据
async function insertTradeData(data) {
  const insertQuery = `
        INSERT INTO stock_indices_trades (index_name, timestamp, price, volume)
        VALUES ($1, $2, $3, $4)
    `;

  for (const record of data) {
    await client.query(insertQuery, [
      record.indexName,
      record.timestamp,
      record.price,
      record.volume,
    ]);
  }
  console.log("Insert Success");
}

async function main() {
  try {
    await client.connect();
    // await createTradeTable();

    const date = "2024-03-27"; // 生成某一天的交易数据
    const intervalMinutes = 1; // 交易记录间隔（1 分钟）

    const sp500Trades = generateTradeData(
      "S&P 500",
      4800,
      4825,
      0.5,
      date,
      intervalMinutes
    );
    const nasdaqTrades = generateTradeData(
      "NASDAQ",
      15000,
      15100,
      0.8,
      date,
      intervalMinutes
    );
    const dowJonesTrades = generateTradeData(
      "Dow Jones",
      36000,
      36150,
      0.6,
      date,
      intervalMinutes
    );

    await insertTradeData([...sp500Trades, ...nasdaqTrades, ...dowJonesTrades]);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
