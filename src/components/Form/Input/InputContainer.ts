import styled from "styled-components";

type Props = {
    error: boolean;
}

const InputContainer = styled.div<Props>`
    border: 1px solid ${props => props.theme.colors.secondary};
    width: 250px;
    height: 50px;
    padding: 0 10px;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-top: 12px;

    &:has(> input:focus) {
        border-width: 3px;
    }
    &:has(> select:focus) {
        border-width: 3px;
    }

    ${({error, theme}) => error ? `
        border-color: ${theme.colors.error};
        border-width: 2px;

        & > label{
            color: ${theme.colors.error};
        }
    ` : null}
`

export default InputContainer;