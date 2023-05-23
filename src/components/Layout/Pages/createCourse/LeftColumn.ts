import styled from "styled-components";

const LeftColumn = styled.div`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 250px 250px;
  gap: 20px;

  grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (orientation: portrait) {
    width: 100%;

    gap: 5px;
    & > * {
      margin-top: 20px;
    }
    & > span {
      margin: 0;
    }

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
`;

export default LeftColumn;
