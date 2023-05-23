import styled from "styled-components";

const ContentMaxWidth = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px 50px 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  & > menu {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
  }

  @media (orientation: portrait) {
    padding: 0 10px 50px 10px;
  }
`;

export default ContentMaxWidth;
