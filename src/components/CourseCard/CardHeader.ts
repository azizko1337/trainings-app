import styled from "styled-components";

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 120px;
  gap: 15px;

  & > * {
    height: 100%;
    flex-basis: 60%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
  }

  & > div {
    position: relative;
    flex-basis: 40%;
  }
`;

export default CardHeader;
