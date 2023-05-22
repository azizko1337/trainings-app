import styled from "styled-components";

type Props = {
  mini?: boolean;
  fixed?: boolean;
};

const Button = styled.button<Props>`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 100px;
  padding: 10px 25px;
  font-size: ${({ theme }) => theme.size.M};
  transition: background-color 0.1s;
  color: ${({ theme }) => theme.colors.text};
  z-index: 5;
  position: relative;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.error};
    &:hover {
      cursor: not-allowed;
    }
  }

  ${(props) =>
    props.mini
      ? `
        padding: 5px 20px;
        
    `
      : null}

  ${(props) =>
    props.fixed
      ? `
        margin: 10px 0;
        width:250px;
        height:50px;
      `
      : null}
`;

export default Button;
