import { Request, Response } from "express";
import { registerUser, userLoin } from "../services/userService";

export interface RegisterBody {
  email: string;
  password: string;
}
interface RegisterRequest extends Request {
  body: RegisterBody;
}

export const register = async (
  req: RegisterRequest,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await registerUser(email, password);
    res.json({ message: "User registered", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};

export const login = async (
  req: RegisterRequest,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await userLoin(email, password);

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
