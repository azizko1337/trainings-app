import styled from "styled-components";

const CardContainer = styled.div`
  height: 450px;
  max-width: 360px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(42, 59, 77, 0.2);
  overflow: hidden;

  @media (orientation: portrait) {
    max-width: 100%;
    overflow-x: scroll;
  }
`;

export default CardContainer;
