import styled, {css} from "styled-components";
import shake from "@/styles/animations/shake";

type Props = {
    theme: object;
    mainPage?: boolean;
    error?: boolean;
}

const Header = styled.h1<Props>`
    font-size: ${({ theme }) => theme.size.XXL}; 
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 1px;
    text-align: center;

    ${({error, theme}) => error ? `color: ${theme.colors.error};` : null}

    /* hand icon */
    ${({mainPage}) => mainPage ? css`
        & > img{
            transform: rotate(180deg);
        }

        &:hover > img{
            transform: rotate(180deg);
            animation: ${shake} 0.82s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }

        padding: 20px 0 50px 0;

        font-size: ${({ theme }) => theme.size.XXXL};
    ` : null}
`;

export default Header;