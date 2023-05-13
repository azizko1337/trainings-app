import styled from "styled-components";

type Props = {
    active: boolean;
}

const Option = styled.li<Props>`
    padding: 5px;

    font-size: ${({theme}) => theme.size.M};
    cursor: pointer;

    &:hover{
        background-color: ${({theme}) => theme.colors.secondary};
        border-right-width: 30px;
        color: ${({theme}) => theme.colors.background};
    }

    ${props => props.active ? `
        border-right: 22px solid ${props.theme.colors.success};
    ` : `
        border-right: 22px solid ${props.theme.colors.error};
    `}
`

export default Option;