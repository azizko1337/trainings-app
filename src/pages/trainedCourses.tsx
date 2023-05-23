import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Header from "@/components/Text/Header";
import type CourseInfo from "@/types/CourseInfo";
import CardsGrid from "@/components/CourseCard/CardsGrid";
import CourseCard from "@/components/CourseCard/CourseCard";
import Button from "@/components/Form/Button";
import FiltersMenu from "@/components/Filters/FiltersMenu";
import Input from "@/components/Form/Input/Input";
import type Filters from "@/types/Filters";
import type { ChangeEvent } from "react";
import filterCourses from "@/utils/filterCourses";
import AuthContext from "@/context/AuthContext";
import NoAuth from "@/components/Utils/NoAuth";
import NoPermission from "@/components/Utils/NoPermission";

function TrainedCourses() {
  const { user } = useContext(AuthContext);

  const [courses, setCourses] = useState<CourseInfo[]>([]);
  useEffect(() => {
    fetch("/api/course/getTrained", {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        if (data.ok) {
          setCourses(data.courses);
        }
      })
    );
  }, []);

  const [showFiltersMenu, setShowFiltersMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    date: [],
    time: [],
    level: [],
    location: [],
    trainer: [],
  });

  function handleSearch(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  }

  if (!user) return <NoAuth />;
  if (!user.isTrainer) return <NoPermission />;

  return (
    <>
      <Header mainPage>My courses (trained by me): </Header>
      <menu>
        <Input
          id="searchCourse"
          type="text"
          label=""
          placeholder="Search by name"
          value={search}
          changeHandler={handleSearch}
          error={""}
        />
        <Button onClick={() => setShowFiltersMenu(!showFiltersMenu)}>
          {showFiltersMenu ? "Close" : "Filters"}
        </Button>
        <FiltersMenu
          show={showFiltersMenu}
          handleClose={() => setShowFiltersMenu(false)}
          courses={courses}
          setFilters={setFilters}
        />
      </menu>
      <CardsGrid>
        {filterCourses(courses, filters, search).map((course, index) => (
          <CourseCard deleteCourse key={"courseCard" + index} {...course} />
        ))}
      </CardsGrid>
    </>
  );
}

export default TrainedCourses;
