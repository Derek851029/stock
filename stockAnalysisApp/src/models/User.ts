import { pool } from "../config/postagreSQL";

export interface IUser {
  id?: number;
  email: string;
  password: string;
}

export class UserModel {
  static async createUser(
    email: string,
    hashedPassword: string
  ): Promise<IUser> {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
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
