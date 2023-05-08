import styled from "styled-components";

const ContentMaxWidth = styled.main`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px 30px 30px;

    &>menu{
        margin-bottom: 20px;
        display:flex;
        justify-content: flex-end;
        align-items: center;
    }
`

export default ContentMaxWidth;