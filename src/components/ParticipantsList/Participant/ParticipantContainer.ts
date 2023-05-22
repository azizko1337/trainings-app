import styled from "styled-components";

const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;

  padding: 15px;

  @media (orientation: portrait) {
    padding: 5px;
    gap: 10px;
  }

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export default ParticipantContainer;
