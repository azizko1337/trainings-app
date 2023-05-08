import { Inter } from "@next/font/google";
import Image from "next/image";
import Header from "@/components/Text/Header";
import type CourseInfo from "@/types/CourseInfo";
import CardsGrid from "@/components/CourseCard/CardsGrid";
import CourseCard from "@/components/CourseCard/CourseCard";
import Button from "@/components/Form/Button";

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
    },
    {
      id: "2",
      img: "/icons/courses/react.png",
      title: "Introduction to React",
      startDate: 1683460009248,
      endDate: 1683460509248,
      startTime: "15:00",
      endTime: "18:00",
      level: "Beginner",
      location: "Online",
      trainer: "John Cube",
    },
    {
      id: "3",
      img: "/icons/courses/react.png",
      title: "Introduction to React",
      startDate: 1683460009248,
      endDate: 1683460509248,
      startTime: "15:00",
      endTime: "18:00",
      level: "Beginner",
      location: "Online",
      trainer: "John Cube",
    },
    {
      id: "4",
      img: "/icons/courses/react.png",
      title: "Introduction to React",
      startDate: 1683460009248,
      endDate: 1683460509248,
      startTime: "15:00",
      endTime: "18:00",
      level: "Beginner",
      location: "Online",
      trainer: "John Cube",
    }
  ];
  
  return (
    <>
      <Header mainPage>Check out our new courses <Image src="/icons/hand.svg" alt="Hand pointing down" width={50} height={40} /></Header>
      <menu>
        <Button>Filters</Button>
      </menu>
      <CardsGrid>
        {courses.map((course, index) => <CourseCard key={"coursecard" + index} {...course}/>)}
      </CardsGrid>
    </>
  );
}

export default Index;