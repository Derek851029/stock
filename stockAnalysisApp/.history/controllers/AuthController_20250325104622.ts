import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { UserModel } from "../src/models/User";

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
  } catch (error) {
    res.status(500).json({ message: "User already exists" });
  }
};
