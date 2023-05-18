import styled from "styled-components";

type Props = {
    gap?: string;
}

const GroupFlex = styled.div<Props>`
    display:flex;
    justify-content: flex-start;
    align-items: center;

    ${props => props.gap ? `gap: ${props.gap};` : ``}
`
export default GroupFlex;