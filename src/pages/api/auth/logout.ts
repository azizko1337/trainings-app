import UserController from "@/controllers/UserController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";

type Data = {
  name: string;
};

export const config = {
  api: {
    responseLimit: "4mb",
  },
};

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userData: User = req.body;
  switch (req.method) {
    case "GET":
      return await UserController.logout(req, res);
      break;
  }
}

export default withIronSessionApiRoute(logoutRoute, ironOptions);
