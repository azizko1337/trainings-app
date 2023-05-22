import UserFrontend from "@/types/UserFrontend";
import ParticipantsListContainer from "./ParticipantsListContainer";
import Participant from "./Participant/Participant";
import MailToAll from "./MailToAll";

const ParticipantsList = ({
  participants,
}: {
  participants: UserFrontend[];
}) => {
  return (
    <>
      <MailToAll
        href={
          participants.length > 0
            ? `mailto:${participants.map((participant) => participant + ",")}`
            : ""
        }
      >
        {participants.length > 0
          ? `Mail to all participants (${participants.length})`
          : "No participants"}
      </MailToAll>

      <ParticipantsListContainer>
        {participants.map((participant: UserFrontend) => (
          <Participant participant={participant} />
        ))}
      </ParticipantsListContainer>
    </>
  );
};

export default ParticipantsList;
