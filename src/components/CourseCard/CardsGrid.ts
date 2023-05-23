import styled from "styled-components";

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (orientation: portrait) {
    max-width: 100%;
    grid-template-columns: 1fr;
  }
`;

export default CardsGrid;
