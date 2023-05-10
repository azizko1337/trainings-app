import styled from "styled-components";

const RightColumn = styled.div`
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    
    @media(orientation: portrait) {
        align-items: flex-end;
    }
`

export default RightColumn;