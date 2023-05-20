import UserController from "@/controllers/UserController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";



type ResData = {
  ok: boolean;
  feedback: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<ResData>) {
  const userData: User = req.body;
  switch(req.method){
    case "GET":
      return await UserController.read(req, res as NextApiResponse<ResData>);
    case "POST":
      return await UserController.create(req, res as NextApiResponse<ResData>, userData);
    case "PUT":
      return await UserController.update(req, res as NextApiResponse<ResData>);
    case "DELETE":
      return await UserController.delete(req, res as NextApiResponse<ResData>);
    default:
      return res.status(405).json({ok: false, feedback: "Method not allowed."});
  }
}

export default withIronSessionApiRoute(userRoute, ironOptions);