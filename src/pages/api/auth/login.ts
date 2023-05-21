import UserController from "@/controllers/UserController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";

type ResData = {
  name: string;
};

async function loginRoute(req: NextApiRequest, res: NextApiResponse<ResData>) {
  const userData: User = req.body;
  switch (req.method) {
    case "POST":
      return await UserController.login(req, res, userData);
      break;
  }
}

export default withIronSessionApiRoute(loginRoute, ironOptions);
