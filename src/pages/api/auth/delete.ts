import UserController from "@/controllers/UserController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";

type ResData = {
  name: string;
};

async function deleteRoute(req: NextApiRequest, res: NextApiResponse<ResData>) {
  switch (req.method) {
    case "POST":
      return await UserController.delete(req, res);
  }
}

export default withIronSessionApiRoute(deleteRoute, ironOptions);
