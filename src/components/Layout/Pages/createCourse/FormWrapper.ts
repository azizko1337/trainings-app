import styled from "styled-components";

const FormWrapper = styled.form`
  width: 100%;
  min-height: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 20px;

  margin-bottom: 30px;

  @media (orientation: portrait) {
    flex-direction: column-reverse;
  }
`;

export default FormWrapper;
