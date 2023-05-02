import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    min-height: 88vh;
    background-color: ${props => props.theme.colors.background};
    
    position:relative;
    display:flex;
    flex-direction: column;
`;

export default Wrapper;