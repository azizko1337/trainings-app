import styled from "styled-components";

type Props = {
  show: boolean;
};

const OptionsContainer = styled.ul<Props>`
  width: 100%;
  min-height: 100%;

  position: absolute;
  z-index: 6;

  list-style: none;
  background-color: ${({ theme }) => theme.colors.primary};

  flex-direction: column;
  display: none;
  ${({ show }) =>
    show
      ? `
        display: flex;
    `
      : null}
`;

export default OptionsContainer;
