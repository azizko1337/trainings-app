import UserController from "@/controllers/UserController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";

type ResData = {
  ok: boolean;
  feedback: string;
};

async function becomeTrainerRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  switch (req.method) {
    case "POST":
      return await UserController.becomeTrainer(req, res);
    default:
      return res
        .status(405)
        .json({ ok: false, feedback: "Method not allowed" });
  }
}

export default withIronSessionApiRoute(becomeTrainerRoute, ironOptions);
