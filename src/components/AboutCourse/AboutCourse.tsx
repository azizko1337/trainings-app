import type CourseInfo from "@/types/CourseInfo";
import AboutCourseContainer from "./AboutCourseContainer";
import AboutCourseLine from "./AboutCourseLine";
import SubHeader from "../Text/SubHeader";
import AboutCourseLineTitle from "./AboutCourseLineTitle";

function AboutCourse({ course }: { course: CourseInfo | null }) {
  return (
    <>
      <SubHeader>{course?.name}</SubHeader>
      <AboutCourseContainer>
        <AboutCourseLine>
          <AboutCourseLineTitle>Start date:</AboutCourseLineTitle>
          {new Date(+(course?.startDate || Date.now())).toLocaleDateString()}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>End date:</AboutCourseLineTitle>
          {new Date(+(course?.endDate || Date.now())).toLocaleDateString()}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>Start time:</AboutCourseLineTitle>{" "}
          {course?.startTime}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>End time:</AboutCourseLineTitle>{" "}
          {course?.endTime}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>Difficulty:</AboutCourseLineTitle>{" "}
          {course?.level}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>Place:</AboutCourseLineTitle> {course?.location}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>Language:</AboutCourseLineTitle>{" "}
          {course?.language.toLocaleUpperCase()}
        </AboutCourseLine>
        <AboutCourseLine>
          <AboutCourseLineTitle>Trainer:</AboutCourseLineTitle>{" "}
          {course?.trainer}
        </AboutCourseLine>
      </AboutCourseContainer>
    </>
  );
}

export default AboutCourse;
