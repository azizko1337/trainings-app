import styled from "styled-components";

type Props = {
    error: boolean;
}

const Error = styled.span<Props>`
    display: ${({error}) => error ? "block" : "none"};
    position: absolute;
    top: 100%;
    left: 0;
    padding: 5px;
    font-size: 12px;
    color: ${({theme}) => theme.colors.error};
`;

export default Error;