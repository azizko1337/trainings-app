import styled from "styled-components";

const AboutCourseLine = styled.div`
  display: flex;
  padding: 15px 10px;
  font-size: ${(props) => props.theme.size.M};

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export default AboutCourseLine;
