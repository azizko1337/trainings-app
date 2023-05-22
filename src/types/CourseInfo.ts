type CourseInfo = {
  id: string;
  courseImage: string;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  level: string;
  location: string;
  language: "pl" | "en";
  trainer: string;
  trainerId: string;
};

export default CourseInfo;
