import { pool } from "../config/postagreSQL";

interface StockIndices {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface ISelectIndices extends StockIndices {
  id: number;
  index_name: string;
}

interface TopGainersData {
  code: string;
  name: string;
  price: number;
  change: number;
  percentage: number;
  volume: string;
  marketCap: string;
}

interface TopGainersResponse {
  data: TopGainersData[];
}

export interface IStockIndicesData {
  "S&P 500": StockIndices[];
  NASDAQ: StockIndices[];
  "Dow Jones": StockIndices[];
}

export class Dashboard {
  static async selectIndices(): Promise<IStockIndicesData | null> {
    const result = await pool.query(
      "SELECT * FROM stock_indices ORDER BY date ASC"
    );

    const rows: ISelectIndices[] = result.rows;
    console.log(rows);
    if (rows.length > 0) return null;

    const resultObj: IStockIndicesData = {
      "S&P 500": rows.filter((item) => item.index_name === "S&P 500"),
      NASDAQ: rows.filter((item) => item.index_name === "NASDAQ"),
      "Dow Jones": rows.filter((item) => item.index_name === "Dow Jones"),
    };

    return resultObj;
  }

  static async selectTopGainers() {
    const stocks: TopGainersData[] = [
      {
        code: "AAPL",
        name: "Apple Inc.",
        price: 175.43,
        change: 2.5,
        percentage: 1.45,
        volume: "1.2億",
        marketCap: "2.8兆",
      },
      {
        code: "MSFT",
        name: "Microsoft Corp.",
        price: 315.67,
        change: 5.32,
        percentage: 1.72,
        volume: "9800萬",
        marketCap: "2.5兆",
      },
      {
        code: "TSLA",
        name: "Tesla Inc.",
        price: 210.35,
        change: -3.45,
        percentage: -1.61,
        volume: "7200萬",
        marketCap: "7500億",
      },
      {
        code: "NVDA",
        name: "NVIDIA Corp.",
        price: 450.12,
        change: 10.22,
        percentage: 2.32,
        volume: "8300萬",
        marketCap: "1.1兆",
      },
      {
        code: "GOOGL",
        name: "Alphabet Inc.",
        price: 130.89,
        change: 1.98,
        percentage: 1.54,
        volume: "6500萬",
        marketCap: "1.7兆",
      },
      {
        code: "AMZN",
        name: "Amazon.com Inc.",
        price: 145.76,
        change: -0.87,
        percentage: -0.59,
        volume: "8900萬",
        marketCap: "1.5兆",
      },
      {
        code: "META",
        name: "Meta Platforms Inc.",
        price: 290.45,
        change: 4.12,
        percentage: 1.44,
        volume: "5600萬",
        marketCap: "9500億",
      },
      {
        code: "NFLX",
        name: "Netflix Inc.",
        price: 390.23,
        change: -2.18,
        percentage: -0.56,
        volume: "4300萬",
        marketCap: "2000億",
      },
      {
        code: "BRK.B",
        name: "Berkshire Hathaway",
        price: 325.78,
        change: 6.45,
        percentage: 2.02,
        volume: "3700萬",
        marketCap: "7300億",
      },
      {
        code: "JPM",
        name: "JPMorgan Chase & Co.",
        price: 158.32,
        change: 1.78,
        percentage: 1.14,
        volume: "5200萬",
        marketCap: "4800億",
      },
    ];
    return stocks;
    // const symbols = [
    //   "AAPL",
    //   "MSFT",
    //   "TSLA",
    //   "NVDA",
    //   "GOOGL",
    //   "AMZN",
    //   "META",
    //   "NFLX",
    //   "BRK.B",
    //   "JPM",
    // ];

    // const stockData = await Promise.all(
    //   symbols.map((symbol) =>
    //     api.get<StockDataResponse>("/quote", {
    //       symbol: symbol,
    //     })
    //   )
    // );
    // return stockData.sort((a, b) => b.volume - a.volume);
  }
}
