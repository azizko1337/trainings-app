import styled from "styled-components";

const InputLabel = styled.label`
    position: absolute;
    top: -12px;
    left: 10px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 2px;
`

export default InputLabel;