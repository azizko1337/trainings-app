import styled from "styled-components";
import Link from "next/link";

const ParticipantMail = styled(Link)`
  font-size: ${({ theme }) => theme.size.M};
  color: ${({ theme }) => theme.colors.link};

  word-wrap: break-word;
  max-width: 30%;
`;

export default ParticipantMail;
