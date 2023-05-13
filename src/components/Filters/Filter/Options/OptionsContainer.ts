import styled from "styled-components";

type Props = {
    show: boolean;
}

const OptionsContainer = styled.ul<Props>`
    width: calc(100% + 6px);
    min-height: calc(100% + 6px);

    position: absolute;
    top: -3px;
    left: -3px;
    z-index: 2;

    list-style: none;
    background-color: ${({theme}) => theme.colors.primary};
    border: 3px solid ${({theme}) => theme.colors.secondary};
    border-radius: 5px;

    flex-direction: column;    
    display: none;
    ${({show}) => show ? `
        display: flex;
    ` : null}
`

export default OptionsContainer;