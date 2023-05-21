export type CreateCourseBody = {
    name: string,
    startDate: number;
    endDate: number,
    startTime: string,
    endTime: string,
    language: "pl" | "en",
    location: string,
    level: "easy" | "medium" | "hard",
    courseImage: string,
}