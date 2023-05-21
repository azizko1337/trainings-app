import { useState, useEffect } from "react";
import CourseInfo from "@/types/CourseInfo";
import removeDuplicates from "@/utils/removeDuplicates";
import FiltersContainer from "./FiltersContainer";
import Filter from "./Filter/Filter";
import NavContainer from "./Filter/Options/NavContainer";
import Button from "../Form/Button";
import type Filters from "@/types/Filters";

type Props = {
  courses: CourseInfo[];
  show: boolean;
  handleClose: () => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

function FiltersMenu(props: Props) {
  const { courses, show, handleClose, setFilters } = props;

  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [levelOptions, setLevelOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [trainerOptions, setTrainerOptions] = useState<string[]>([]);

  useEffect(() => {
    setFilters({
      date: dateOptions,
      time: timeOptions,
      level: levelOptions,
      location: locationOptions,
      trainer: trainerOptions,
    });
  }, [
    setFilters,
    dateOptions,
    timeOptions,
    levelOptions,
    locationOptions,
    trainerOptions,
  ]);

  return (
    <FiltersContainer show={show}>
      <Filter
        filterName="Date"
        state={dateOptions}
        setState={setDateOptions}
        options={removeDuplicates(
          courses.map(
            (course) =>
              `${new Date(+course.startDate).toLocaleDateString()} - ${new Date(
                +course.endDate
              ).toLocaleDateString()}`
          )
        )}
      />
      <Filter
        filterName="Time"
        state={timeOptions}
        setState={setTimeOptions}
        options={removeDuplicates(
          courses.map((course) => `${course.startTime} - ${course.endTime}`)
        )}
      />
      <Filter
        filterName="Level"
        state={levelOptions}
        setState={setLevelOptions}
        options={removeDuplicates(courses.map((course) => course.level))}
      />
      <Filter
        filterName="Location"
        state={locationOptions}
        setState={setLocationOptions}
        options={removeDuplicates(courses.map((course) => course.location))}
      />
      <Filter
        filterName="Trainer"
        state={trainerOptions}
        setState={setTrainerOptions}
        options={removeDuplicates(courses.map((course) => course.trainer))}
      />
      <NavContainer>
        <Button
          mini
          onClick={() =>
            setFilters({
              date: [],
              time: [],
              level: [],
              location: [],
              trainer: [],
            })
          }
        >
          reset
        </Button>
        <Button mini onClick={handleClose}>
          X
        </Button>
      </NavContainer>
    </FiltersContainer>
  );
}

export default FiltersMenu;
