import { CreateCourseBody } from "@/types/controllers/CourseController";
import isBase64UrlImage from "../isBase64UrlImage";

async function validateCourse(course: CreateCourseBody): Promise<string> {
  const {
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    language,
    location,
    level,
    courseImage,
  } = course;

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (+startDate < Date.now()) {
    return "Start date must be in the future";
  }

  if (+endDate < +startDate) {
    return "End date must be after start date";
  }

  if (startTime.length !== 5) {
    return "Start time must be between 0 and 23";
  }

  if (endTime.length !== 5) {
    return "End time must be between 0 and 23";
  }

  if (
    language.toLocaleLowerCase() !== "pl" &&
    language.toLocaleLowerCase() !== "en"
  ) {
    return "Language must be PL or EN";
  }

  if (location.length < 2 || location.length > 50) {
    return "Location must be between 2 and 50 characters";
  }

  if (level !== "easy" && level !== "medium" && level !== "hard") {
    return "Level must be easy, medium or hard";
  }

  if (!isBase64UrlImage(courseImage)) {
    return "Course image is invalid";
  }

  return "";
}

export default validateCourse;
