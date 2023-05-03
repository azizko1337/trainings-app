import styled from "styled-components";

const SubHeader = styled.h2`
    font-size: ${({ theme }) => theme.size.XL}px;
    color: ${({ theme }) => theme.color.text};
    letter-spacing: 1px;
`;

export default SubHeader;