import styled from "styled-components";

type Props = {
  show: boolean;
};

const FiltersContainer = styled.ul<Props>`
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  width: 30%;

  background-color: ${(props) => props.theme.colors.primary};

  position: absolute;
  top: 95%;
  right: 90px;
  z-index: 1;

  @media (orientation: portrait) {
    width: calc(100% - 90px);
  }

  display: none;
  ${(props) =>
    props.show
      ? `
        display: flex;
    `
      : null}
`;

export default FiltersContainer;
