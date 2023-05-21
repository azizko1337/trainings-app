import Image from "next/image";
import Router from "next/router";
import { MouseEvent, useContext } from "react";
import type CourseInfo from "@/types/CourseInfo";
import CardCointainer from "./CardCointainer";
import CardHeader from "./CardHeader";
import SubHeader from "../Text/SubHeader";
import CardBody from "./CardBody";
import CardBodyRow from "./CardBodyRow";
import CardFooter from "./CardFooter";
import EnrollButton from "./EnrollButton";
import timeStampToString from "@/utils/timestampToString";
import AuthContext from "@/context/AuthContext";
interface Props extends CourseInfo {
  noEnroll?: boolean;
}

function CourseCard(props: Props) {
  const { user } = useContext(AuthContext);

  const {
    id,
    courseImage,
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    level,
    location,
    trainer,
    noEnroll = false,
  } = props;

  async function handleEnroll(e: MouseEvent) {
    e.preventDefault();
    if (user) {
      const res = await fetch(`/api/course/enroll/?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.ok) {
        await Router.push("/courses");
        Router.reload();
      }
    } else {
      Router.push("/auth/login");
    }
  }

  async function handleUnenroll(e: MouseEvent) {
    e.preventDefault();
    if (user) {
      const res = await fetch(`/api/course/unenroll/?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.ok) {
        await Router.push("/courses");
        Router.reload();
      }
    } else {
      Router.push("/auth/login");
    }
  }

  return (
    <CardCointainer>
      <CardHeader>
        <div>
          <Image src={courseImage} alt="title" width={115} height={115} />
        </div>
        <SubHeader thin>{name}</SubHeader>
      </CardHeader>
      <CardBody>
        <CardBodyRow>
          <Image
            src="/icons/calendar.svg"
            alt="course start and end dates"
            width={18}
            height={18}
          />
          {timeStampToString(+startDate, +endDate)}
        </CardBodyRow>
        <CardBodyRow>
          <Image
            src="/icons/clock.svg"
            alt="course start and end time"
            width={18}
            height={18}
          />
          {startTime} - {endTime}
        </CardBodyRow>
        <CardBodyRow>
          <Image
            src="/icons/level.svg"
            alt="course level"
            width={18}
            height={18}
          />
          {level}
        </CardBodyRow>
        <CardBodyRow>
          <Image
            src="/icons/location.svg"
            alt="location"
            width={18}
            height={18}
          />
          {location}
        </CardBodyRow>
        <CardBodyRow>
          <Image
            src="/icons/trainer.svg"
            alt="trainer"
            width={18}
            height={18}
          />
          {trainer}
        </CardBodyRow>
      </CardBody>
      {noEnroll ? (
        <CardFooter>
          <EnrollButton onClick={handleUnenroll}>Unenroll</EnrollButton>
        </CardFooter>
      ) : (
        <CardFooter>
          <EnrollButton onClick={handleEnroll}>Enroll</EnrollButton>
        </CardFooter>
      )}
    </CardCointainer>
  );
}

export default CourseCard;
