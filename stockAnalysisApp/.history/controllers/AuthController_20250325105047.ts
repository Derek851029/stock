import { Request, Response } from "express";
import bcrypt, { hash } from "bcryptjs";
import { UserModel } from "../src/models/User";
import { sign } from "jsonwebtoken";

interface RegisterBody {
  email: string;
  password: string;
}
interface RegisterRequest extends Request {
  body: RegisterBody;
}

export const register = async (req: RegisterRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await UserModel.createUser(email, hashedPassword);
    res.json({ message: "User registered", user });

    return;
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

export const login = async (req: RegisterRequest, res: Response) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET || "derek";
  try {
    const user = await UserModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

export const logout = (req: RegisterRequest, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
