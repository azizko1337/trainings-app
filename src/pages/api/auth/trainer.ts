import UserController from "@/controllers/UserController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";

type ResData = {
  ok: boolean;
  feedback: string;
};

export const config = {
  api: {
    responseLimit: "4mb",
  },
};

async function trainerRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  switch (req.method) {
    case "DELETE":
      return await UserController.ceaseTrainer(req, res);
    case "POST":
      return await UserController.becomeTrainer(req, res);
    default:
      return res
        .status(405)
        .json({ ok: false, feedback: "Method not allowed" });
  }
}

export default withIronSessionApiRoute(trainerRoute, ironOptions);
