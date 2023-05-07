import styled from "styled-components";

const EnrollButton = styled.button`
  background: #706f93;
  border: 2px solid #4d4c78;
  border-radius: 20px;
  color: white;
  font-size: 15px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .1s;

  &:hover{
    cursor: pointer;
    background: #fff;
    color: #706f93;
  }
`

export default EnrollButton;