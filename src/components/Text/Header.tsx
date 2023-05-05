import styled from "styled-components";

const Header = styled.h1`
    font-size: ${({ theme }) => theme.size.XXL}px; 
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 1px;
`;

export default Header;