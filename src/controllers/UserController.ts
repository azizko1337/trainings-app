import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import type User from "@/types/User";
import setSession from "@/utils/setSession";
import type UserFrontend from "@/types/UserFrontend";
import UserBackend from "@/types/UserBackend";
import type ProfileForm from "@/types/ProfileForm";
import type { DeleteBody } from "@/types/controllers/UserController";

const prisma = new PrismaClient();

class UserController {
  static async create(
    req: NextApiRequest,
    res: NextApiResponse,
    userData: User
  ) {
    if (req.session?.user) {
      return res.status(500).json({ feedback: "You are already logged in." });
    }
    try {
      let user = {};
      let passwordHash;

      try {
        passwordHash = await bcrypt.hash(userData.password, 10);
      } catch (error) {
        throw new Error("Error while hashing password.");
      }

      try {
        user = await prisma.user.create({
          data: {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: passwordHash,
            profileImage: userData.profileImage,
          },
        });
      } catch (e: any) {
        throw new Error("Email already exists");
      }

      await setSession(req, user as User);
      return res.status(200).json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async read(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      let user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      user = user as UserBackend;
      if (!user) {
        throw new Error("User not found");
      }

      const userFrontend: UserFrontend = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        isTrainer: user.isTrainer,
      };

      return res.json({
        ok: true,
        feedback: "Found user.",
        user: userFrontend,
      });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: "User not found." });
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    const userData: ProfileForm = req.body;

    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const isPasswordValid = await bcrypt.compare(
        userData.oldPassword,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid old password");
      }

      try {
        await prisma.user.update({
          where: {
            id: req.session.user.id,
          },
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileImage: userData.profileImage,
            password:
              userData.newPassword.length > 0
                ? await bcrypt.hash(userData.newPassword, 10)
                : user.password,
          },
        });
      } catch (error) {
        throw new Error("Error editing data.");
      }

      return res.json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ feedback: e.message });
    }
  }

  static async delete(req: NextApiRequest, res: NextApiResponse) {
    const userData: DeleteBody = req.body;
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Wrong user.");
      }

      const isPasswordValid = await bcrypt.compare(
        userData.oldPassword,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid old password");
      }

      try {
        await prisma.user.delete({
          where: {
            id: req.session.user.id,
          },
        });
      } catch (error) {
        throw new Error("Database error while deleting user.");
      }

      req.session.destroy();
      return res.json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ ok: false, feedback: e.message });
    }
  }

  static async becomeTrainer(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      if (req.body?.code !== process.env.BECOME_TRAINER_CODE) {
        throw new Error("Wrong code.");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Wrong user.");
      }
      if (user.isTrainer) {
        throw new Error("You are already a trainer.");
      }
      try {
        await prisma.user.update({
          where: {
            id: req.session.user.id,
          },
          data: {
            isTrainer: true,
          },
        });
      } catch (e: any) {
        throw new Error("Database error while becoming trainer.");
      }

      res
        .status(200)
        .json({ ok: true, feedback: "Succesfully became trainer." });
    } catch (e: any) {
      return res.status(500).json({ feedback: e.message });
    }
  }
  static async ceaseTrainer(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      const oldPassword = req.body?.oldPassword;
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Wrong user.");
      }
      if (!user.isTrainer) {
        throw new Error("You are not a trainer.");
      }
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      try {
        await prisma.user.update({
          where: {
            id: req.session.user.id,
          },
          data: {
            isTrainer: false,
          },
        });
      } catch (e: any) {
        throw new Error("Database error while ceasing trainer.");
      }
      res
        .status(200)
        .json({ ok: true, feedback: "Succesfully ceased trainer." });
    } catch (e: any) {
      return res.status(500).json({ feedback: e.message });
    }
  }

  static async login(
    req: NextApiRequest,
    res: NextApiResponse,
    userData: User
  ) {
    if (req.session?.user) {
      return res.status(500).json({ feedback: "User already logged in." });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      await setSession(req, user);

      return res.json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ feedback: e.message });
    }
  }

  static async logout(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session?.user) {
      return res.status(500).json({ feedback: "You are not logged in." });
    }
    try {
      req.session.destroy();
      return res.json({ ok: true });
    } catch (e: any) {
      return res
        .status(500)
        .json({ ok: false, feedback: "Errpr while logging out." });
    }
  }
}

export default UserController;
