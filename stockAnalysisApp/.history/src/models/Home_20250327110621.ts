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

export interface IStockIndicesData {
  "S&P500": StockIndices[];
  NASDAQ: StockIndices[];
  "Dow Jones": StockIndices[];
}

export class HomeModel {
  static async selectIndices(): Promise<IStockIndicesData> {
    const result = await pool.query<ISelectIndices>(
      "SELECT * FROM stock_indices ORDER BY date ASC"
    );
    return result;
  }
}
