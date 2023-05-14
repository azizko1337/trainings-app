import styled from "styled-components";
import Link from "next/link";

const Option = styled(Link)`
    padding: 10px;
    font-size: ${props => props.theme.size.M};

    display: flex;
    justify-content: flex-end;
    align-items: center;

    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    
    &:hover {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.background};
    }
`

export default Option;