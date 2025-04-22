import bcrypt, { hash } from "bcryptjs";
import { RegisterBody } from "../controllers/UserController";
import { UserModel } from "../src/models/User";
import { sign } from "jsonwebtoken";

const registerUser = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10);
  const existingUser = await UserModel.findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const user = await UserModel.createUser(email, hashedPassword);

  return user;
};

const userLoin = async (email: string, password: string) => {
  const SECRET_KEY = process.env.JWT_SECRET || "derek";

  const user = await UserModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

export { registerUser };
