import Image from "next/image";
import UserFrontend from "@/types/UserFrontend";
import ParticipantContainer from "./ParticipantContainer";
import ParticipantName from "./ParticipantName";
import ParticipantMail from "./ParticipantMail";
import ImageContainer from "./ImageContainer";
import FlexGrow from "@/components/Utils/FlexGrow";

function Participant({ participant }: { participant: UserFrontend }) {
  return (
    <ParticipantContainer>
      <ImageContainer>
        <Image
          fill={true}
          alt="Profile image"
          src={participant?.profileImage || "/default-profile.jpg"}
        />
      </ImageContainer>
      <ParticipantName>
        {participant?.firstName + " " + participant?.lastName}
      </ParticipantName>
      <FlexGrow></FlexGrow>
      <ParticipantMail href={`mailto:${participant?.email}`}>
        {participant?.email}
      </ParticipantMail>
    </ParticipantContainer>
  );
}

export default Participant;
