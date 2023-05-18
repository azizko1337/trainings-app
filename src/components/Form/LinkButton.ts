import styled from "styled-components";
import Link from "next/link";



const LinkButton = styled(Link)`
    border: 1px solid ${({theme}) => theme.colors.secondary};
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 100px;
    padding: 10px 25px;
    font-size: ${({theme}) => theme.size.M};
    transition: background-color .1s;
    color: ${({theme}) => theme.colors.text};

    &:hover{
        cursor: pointer;
        background: ${({theme}) => theme.colors.secondary};
        color: ${({theme}) => theme.colors.background};
    }

    &:disabled{
        border-color:${({theme}) => theme.colors.error};
        &:hover{
            cursor: not-allowed;
        }
    }
`

export default LinkButton;