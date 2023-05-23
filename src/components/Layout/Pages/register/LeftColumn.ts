import styled from "styled-components";

const LeftColumn = styled.div`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 250px 250px;
  gap: 20px;

  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding-left: 10px;
  margin-bottom: 20px;

  @media (orientation: portrait) {
    width: 100%;

    gap: 0;
    & > * {
      margin-top: 30px;
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
