import styled from "styled-components";

type Props = {
  show: boolean;
};

const Options = styled.menu<Props>`
  position: absolute;
  z-index: 3;
  top: 72px;
  right: 52px;
  width: 200px;

  flex-direction: column;
  display: none;
  ${(props) => (props.show ? `display: flex;` : null)}
`;

export default Options;
