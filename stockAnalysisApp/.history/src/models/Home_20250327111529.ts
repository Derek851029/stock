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
  "S&P 500": StockIndices[];
  NASDAQ: StockIndices[];
  "Dow Jones": StockIndices[];
}

export class HomeModel {
  static async selectIndices(): Promise<IStockIndicesData> {
    const result = await pool.query(
      "SELECT * FROM stock_indices ORDER BY date ASC"
    );
    const rows: ISelectIndices[] = result.rows;

    const resultObj: IStockIndicesData = {
      "S&P 500": rows.filter((item) => item.index_name === "S&P 500"),
      NASDAQ: rows.filter((item) => item.index_name === "NASDAQ"),
      "Dow Jones": rows.filter((item) => item.index_name === "Dow Jones"),
    };

    return resultObj;
  }
}
