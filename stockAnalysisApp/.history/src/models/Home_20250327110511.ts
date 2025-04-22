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
  static async selectIndices(): Promise<ISelectIndices> {
    const result = await pool.query<ISelectIndices>(
      "SELECT * FROM stock_indices ORDER BY date ASC"
    );
    return result.rows[0];
  }

  static async findUserByEmail(email: string): Promise<IUser | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}
