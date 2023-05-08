import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;

    @media(orientation: portrait) {
        padding-bottom: 20px;
        align-items: flex-end;
    }
`

export default Container;