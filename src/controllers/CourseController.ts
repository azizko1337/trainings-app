import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateCourseBody } from "@/types/controllers/CourseController";
import CourseInfo from "@/types/CourseInfo";

const prisma = new PrismaClient();

class CourseController {
  static async create(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
        select: {
          isTrainer: true,
        },
      });
      if (!user || !user?.isTrainer) {
        throw new Error("You are not a trainer.");
      }
      const newCourse: CreateCourseBody = req.body;
      try {
        await prisma.course.create({
          data: {
            name: newCourse.name,
            startDate: newCourse.startDate,
            endDate: newCourse.endDate,
            startTime: newCourse.startTime,
            endTime: newCourse.endTime,
            language: newCourse.language,
            location: newCourse.location,
            level: newCourse.level,
            courseImage: newCourse.courseImage,
            trainerId: req.session.user.id,
          },
        });
      } catch (e: any) {
        throw new Error("Database error creating course.");
      }

      return res
        .status(200)
        .json({ ok: true, feedback: "Course created successfully." });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async getOne(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const id: string = req.query?.id as string;
      if (!id) {
        throw new Error("Missing course id.");
      }
      const course = await prisma.course.findUnique({
        include: {
          trainer: true,
        },
        where: {
          id,
        },
      });
      if (!course) {
        throw new Error("Course not found.");
      }
      course.trainer = course.trainer.firstName + " " + course.trainer.lastName;

      return res.status(200).json({
        ok: true,
        feedback: "Course found.",
        course,
      });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async getParticipiedInCourses(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const courses = await prisma.course.findMany({
        include: {
          trainer: true,
        },
        where: {
          participants: {
            some: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              id: req.session.user.id,
            },
          },
        },
      });
      courses.forEach(
        (course) =>
          (course.trainer =
            course.trainer.firstName + " " + course.trainer.lastName)
      );
      return res
        .status(200)
        .json({ ok: true, feedback: "Courses found.", courses });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async getTrainedCourses(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res
        .status(500)
        .json({ ok: false, feedback: "You are not logged in." });
    }
    try {
      let courses = [];
      try {
        courses = await prisma.course.findMany({
          include: {
            trainer: true,
          },
          where: {
            trainerId: req.session.user.id,
          },
        });
      } catch (e: any) {
        throw new Error("Database error getting courses.");
      }
      courses.forEach(
        (course) =>
          (course.trainer =
            course.trainer.firstName + " " + course.trainer.lastName)
      );
      return res
        .status(200)
        .json({ ok: true, feedback: "Courses found.", courses });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async enroll(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res
        .status(500)
        .json({ ok: false, feedback: "You are not logged in." });
    }
    try {
      const id: string = req.query?.id as string;
      if (!id) {
        throw new Error("Missing course id.");
      }
      const course = await prisma.course.findUnique({
        where: {
          id,
        },
      });
      if (!course) {
        throw new Error("Course not found.");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }
      try {
        await prisma.course.update({
          where: {
            id,
          },
          data: {
            participants: {
              connect: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                id: req.session.user.id,
              },
            },
          },
        });
      } catch (e: any) {
        console.log(e);
        throw new Error("Database error enrolling in course.");
      }

      return res
        .status(200)
        .json({ ok: true, feedback: "Enrolled successfully." });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async unenroll(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res
        .status(500)
        .json({ ok: false, feedback: "You are not logged in." });
    }
    try {
      const id: string = req.query?.id as string;
      if (!id) {
        throw new Error("Missing course id.");
      }
      const course = await prisma.course.findUnique({
        where: {
          id,
        },
      });
      if (!course) {
        throw new Error("Course not found.");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }
      try {
        await prisma.course.update({
          where: {
            id,
          },
          data: {
            participants: {
              disconnect: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                id: req.session.user.id,
              },
            },
          },
        });
      } catch (e: any) {
        console.log(e);
        throw new Error("Database error unenrolling in course.");
      }

      return res
        .status(200)
        .json({ ok: true, feedback: "Unenrolled successfully." });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async getFeed(req: NextApiRequest, res: NextApiResponse) {
    try {
      let courses = [];
      try {
        if (req.session?.user) {
          courses = await prisma.course.findMany({
            include: {
              trainer: true,
            },
            where: {
              participants: {
                none: {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  id: req.session.user.id,
                },
              },
            },
          });
        } else {
          courses = await prisma.course.findMany({
            include: {
              trainer: true,
            },
          });
        }
        courses.forEach(
          (course) =>
            (course.trainer =
              course.trainer.firstName + " " + course.trainer.lastName)
        );
      } catch (e: any) {
        console.log(e);
        throw new Error("Database error getting courses.");
      }
      return res
        .status(200)
        .json({ ok: true, feedback: "Courses found.", courses });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async delete(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const id: string = req.query?.id as string;
      if (!id) {
        throw new Error("Missing course id.");
      }
      const course = await prisma.course.findUnique({
        where: {
          id,
        },
      });
      if (!course) {
        throw new Error("Course not found.");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }
      if (course.trainerId !== req.session.user.id) {
        throw new Error("You are not the trainer of this course.");
      }
      try {
        await prisma.course.delete({
          where: {
            id,
          },
        });
      } catch (e: any) {
        throw new Error("Database error deleting course.");
      }

      return res
        .status(200)
        .json({ ok: true, feedback: "Deleted successfully." });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const id: string = req.body?.id as string;
      if (!id) {
        throw new Error("Missing course id.");
      }
      const course = await prisma.course.findUnique({
        where: {
          id,
        },
      });
      if (!course) {
        throw new Error("Course not found.");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }
      if (course.trainerId !== req.session.user.id) {
        throw new Error("You are not the trainer of this course.");
      }
      try {
        await prisma.course.update({
          where: {
            id,
          },
          data: {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            language: req.body.language,
            location: req.body.location,
            level: req.body.level,
            courseImage: req.body.courseImage,
          },
        });
      } catch (e: any) {
        throw new Error("Database error updating course.");
      }

      return res
        .status(200)
        .json({ ok: true, feedback: "Updated successfully." });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }
}

export default CourseController;
