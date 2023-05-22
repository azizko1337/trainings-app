import SessionUser from "@/types/SessionUser";

declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUser;
  }
}

export const ironOptions = {
  cookieName: "trainingsapp-session",
  password: process.env.SESSION_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
