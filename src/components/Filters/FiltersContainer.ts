import styled from "styled-components";

type Props = {
    show: boolean;
}

const FiltersContainer = styled.ul<Props>`
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    
    width: 30%;

    background-color: ${props => props.theme.colors.primary};
    border: 3px solid ${props => props.theme.colors.secondary};;
    border-radius: 5px;

    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    
    @media(orientation: portrait){
        width:90%;
    }

    display: none;
    ${props => props.show ? `
        display: flex;
    ` : null}
`

export default FiltersContainer;