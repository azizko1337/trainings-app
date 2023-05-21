import CourseController from "@/controllers/CourseController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";
import { Course } from "@prisma/client";

type ResData = {
  ok: boolean;
  feedback: string;
  course?: Course;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<ResData>) {
  const userData: User = req.body;
  switch (req.method) {
    case "GET":
      return await CourseController.getOne(
        req,
        res as NextApiResponse<ResData>
      );
    case "POST":
      return await CourseController.create(
        req,
        res as NextApiResponse<ResData>
      );
    case "DELETE":
      return await CourseController.delete(
        req,
        res as NextApiResponse<ResData>
      );
    default:
      return res
        .status(405)
        .json({ ok: false, feedback: "Method not allowed." });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default withIronSessionApiRoute(userRoute, ironOptions);
