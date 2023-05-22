export type CreateCourseBody = {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  language: "pl" | "en";
  location: string;
  level: "easy" | "medium" | "hard";
  courseImage: string;
};
