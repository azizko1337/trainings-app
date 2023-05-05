import styled, {css} from "styled-components";
import shake from "@/styles/animations/shake";

type Props = {
    theme: object;
    mainPage?: boolean;
}

const Header = styled.h1<Props>`
    font-size: ${({ theme }) => theme.size.XXL}px; 
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 1px;

    display:flex;
    align-items: center;

    /* hand icon */
    ${({mainPage}) => mainPage ? css`
        & > img{
            transform: rotate(180deg);
        }

        &:hover > img{
            transform: rotate(180deg);
            animation: ${shake} 0.82s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
    ` : null}
`;

export default Header;