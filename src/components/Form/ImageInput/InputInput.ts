import styled from "styled-components";

const InputInput = styled.input`
    &::-webkit-file-upload-button {
        border: 1px solid ${({theme}) => theme.colors.secondary};
        border-radius: 100px;
        padding: 10px 20px;
        font-size: 16px;
    }
    &::-webkit-file-upload-button:hover {
        cursor: pointer;
        background: ${({theme}) => theme.colors.tertiary};
        color: ${({theme}) => theme.colors.background};
    }
`

export default InputInput;