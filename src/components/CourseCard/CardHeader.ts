import styled from "styled-components";

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    height: 120px;
    gap: 15px;

    & > *{
        height:100%;
        flex-basis:50%;

        display:flex;
        align-items:center;
        justify-content:center;
        
        text-align: center;
    }

    & > div{
        position:relative;
    }
`

export default CardHeader;