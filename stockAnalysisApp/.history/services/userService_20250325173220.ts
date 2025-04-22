import { hash } from "bcryptjs";
import { RegisterBody } from "../controllers/UserController";
import { UserModel } from "../src/models/User";

const registerUser = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10);
  const existingUser = await UserModel.findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const user = await UserModel.createUser(email, hashedPassword);

  return user;
};

export { registerUser };
