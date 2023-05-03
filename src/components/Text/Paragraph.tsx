import styled from "styled-components";

const Paragraph = styled.p`
    font-size: ${({ theme }) => theme.size.M}px;
    color: ${({ theme }) => theme.color.text};
`;

export default Paragraph;