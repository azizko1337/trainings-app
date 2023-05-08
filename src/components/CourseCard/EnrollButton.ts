import styled from "styled-components";

const EnrollButton = styled.button`
  background: ${({theme}) => theme.colors.secondary};
  border: 2px solid ${({theme}) => theme.colors.tertiary};
  border-radius: 20px;
  color: ${({theme}) => theme.colors.background};
  font-size: 15px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .1s;

  &:hover{
    cursor: pointer;
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.text};
  }
`

export default EnrollButton;