import type CourseInfo from "@/types/CourseInfo";
import type Filters from "@/types/Filters";
import timestampToString from "@/utils/timestampToString";
import timeToString from "./timeToString";

function filterCourses(
  courses: CourseInfo[],
  filters: Filters,
  search: string
) {
  let filtered: CourseInfo[] = courses;

  if (filters.date.length > 0) {
    filtered = filtered.filter((course) =>
      filters.date.includes(
        timestampToString(+course.startDate, +course.endDate)
      )
    );
  }
  if (filters.time.length > 0) {
    filtered = filtered.filter((course) =>
      filters.time.includes(timeToString(course.startTime, course.endTime))
    );
  }
  if (filters.location.length > 0) {
    filtered = filtered.filter((course) =>
      filters.location.includes(course.location)
    );
  }
  if (filters.level.length > 0) {
    filtered = filtered.filter((course) =>
      filters.level.includes(course.level)
    );
  }
  if (filters.trainer.length > 0) {
    filtered = filtered.filter((course) =>
      filters.trainer.includes(course.trainer)
    );
  }
  if (search.length > 0) {
    filtered = filtered.filter((course) =>
      course.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filtered;
}

export default filterCourses;
