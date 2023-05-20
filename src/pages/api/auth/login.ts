import UserController from "@/controllers/UserController";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userData: User = req.body;
  UserController.login(req, res, userData);
}
