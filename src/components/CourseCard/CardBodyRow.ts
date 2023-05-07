import styled from "styled-components";

const CardBodyRow = styled.li`
    display:flex;
    align-items: center;
    gap: 8px;
    font-size: ${({theme}) => theme.size.M};
`

export default CardBodyRow;
