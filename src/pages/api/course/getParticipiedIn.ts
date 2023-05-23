import CourseController from "@/controllers/CourseController";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";
import { Course } from "@prisma/client";

type ResData = {
  ok: boolean;
  feedback: string;
  courses?: Course;
};

export const config = {
  api: {
    responseLimit: "30mb",
  },
};

async function getParticipiedInRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  switch (req.method) {
    case "GET":
      return await CourseController.getParticipiedInCourses(
        req,
        res as NextApiResponse<ResData>
      );
    default:
      return res
        .status(405)
        .json({ ok: false, feedback: "Method not allowed." });
  }
}

export default withIronSessionApiRoute(getParticipiedInRoute, ironOptions);
