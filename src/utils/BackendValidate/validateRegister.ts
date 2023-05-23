import type User from "@/types/User";
import isBase64UrlImage from "../isBase64UrlImage";

async function validateRegister(user: User): Promise<string> {
  const { email, firstName, lastName, password, profileImage } = user;

  if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
    email.length > 320 ||
    email.length < 4
  ) {
    return "Email is invalid";
  }

  if (firstName.length < 2 || firstName.length > 20) {
    return "First name must be between 2 and 20 characters";
  }

  if (lastName.length < 2 || lastName.length > 36) {
    return "Last name must be between 2 and 36 characters";
  }

  if (password.length < 8 || password.length > 64) {
    return "Password must be between 8 and 64 characters";
  }

  if (!isBase64UrlImage(profileImage)) {
    return "Profile image is invalid";
  }

  return "";
}

export default validateRegister;
