import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
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

const inter = Inter({ subsets: ["latin"] });

function Index() {
  const courses: CourseInfo[] = [
    {
      id: "1",
      img: "/icons/courses/react.png",
      title: "Introduction to React",
      startDate: 1683460009248,
      endDate: 1683460509248,
      startTime: "15:00",
      endTime: "18:00",
      level: "Beginner",
      location: "Online",
      trainer: "John Cube",
      trainerId: "1",
    },
    {
      id: "2",
      img: "/icons/courses/react.png",
      title: "Introduction to Pythnon",
      startDate: 234345435423,
      endDate: 213211233211,
      startTime: "13:00",
      endTime: "18:00",
      level: "Medium",
      location: "Paris",
      trainer: "John Cuber",
      trainerId: "2",
    },
    {
      id: "3",
      img: "/icons/courses/react.png",
      title: "Introduction to React",
      startDate: 1683460009248,
      endDate: 223423423423,
      startTime: "15:00",
      endTime: "18:00",
      level: "Beginner",
      location: "Online",
      trainer: "John Cube",
      trainerId: "1",
    },
    {
      id: "4",
      img: "/icons/courses/react.png",
      title: "Introduction to React",
      startDate: 2312312312321,
      endDate: 123243234234,
      startTime: "10:00",
      endTime: "12:00",
      level: "Advanced",
      location: "Warsaw",
      trainer: "Adam Smith",
      trainerId: "3",
    }
  ];
  const [showFiltersMenu, setShowFiltersMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    date: [],
    time: [],
    level: [],
    location: [],
    trainer: [],
  });
  
  function handleSearch(e: ChangeEvent){
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  }

  return (
    <>
      <Header mainPage>Check out our new courses <Image src="/icons/hand.svg" alt="Hand pointing down" width={50} height={40} /></Header>
      <menu>
        <Input id="searchCourse" type="text" label="" placeholder="Search by name" value={search} changeHandler={handleSearch} error={""}/>
        <Button onClick={() => setShowFiltersMenu(true)}>Filters</Button>
        <FiltersMenu show={showFiltersMenu} handleClose={() => setShowFiltersMenu(false)} courses={courses} setFilters={setFilters}/>
      </menu>
      <CardsGrid>
        {filterCourses(courses, filters, search).map((course, index) => <CourseCard key={"coursecard" + index} {...course}/>)}
      </CardsGrid>
    </>
  );
}

export default Index;