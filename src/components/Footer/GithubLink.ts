import styled from "styled-components";
import Link from "next/link";

const GithubLink = styled(Link)`
  width: 7vh;
  height: 7vh;
  cursor: pointer;
  position: relative;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export default GithubLink;
