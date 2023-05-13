import Image from "next/image";
import type CourseInfo from "@/types/CourseInfo";
import CardCointainer from "./CardCointainer";
import CardHeader from "./CardHeader";
import SubHeader from "../Text/SubHeader";
import CardBody from "./CardBody";
import CardBodyRow from "./CardBodyRow";
import CardFooter from "./CardFooter";
import EnrollButton from "./EnrollButton";
import timeStampToString from "@/utils/timestampToString";

function CourseCard(props: CourseInfo){
    const {id, img, title, startDate, endDate, startTime, endTime, level, location, trainer} = props;

    return (
        <CardCointainer>
            <CardHeader>
                <div>
                    <Image src={img} alt="title" width={115} height={115}/>
                </div>
                <SubHeader thin>{title}</SubHeader>
            </CardHeader>
            <CardBody>
                <CardBodyRow><Image src="/icons/calendar.svg" alt="course start and end dates" width={18} height={18}/>{timeStampToString(startDate, endDate)}</CardBodyRow>
                <CardBodyRow><Image src="/icons/clock.svg" alt="course start and end time" width={18} height={18}/>{startTime} - {endTime}</CardBodyRow>
                <CardBodyRow><Image src="/icons/level.svg" alt="course level" width={18} height={18}/>{level}</CardBodyRow>
                <CardBodyRow><Image src="/icons/location.svg" alt="location" width={18} height={18}/>{location}</CardBodyRow>
                <CardBodyRow><Image src="/icons/trainer.svg" alt="trainer" width={18} height={18}/>{trainer}</CardBodyRow>
            </CardBody>
            <CardFooter>
                <EnrollButton>Enroll</EnrollButton>
            </CardFooter>
        </CardCointainer>
    )
}

export default CourseCard;