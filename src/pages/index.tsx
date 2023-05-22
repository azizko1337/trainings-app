import { useEffect, useState } from "react";
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

function Index() {
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  useEffect(() => {
    fetch("/api/course/feed")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setCourses(data.courses);
      });
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

  return (
    <>
      <Header mainPage>
        Check out our new courses{" "}
        <Image
          src="/icons/hand.svg"
          alt="Hand pointing down"
          width={50}
          height={40}
        />
      </Header>
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
          <CourseCard key={"coursecard" + index} {...course} />
        ))}
      </CardsGrid>
    </>
  );
}

export default Index;
