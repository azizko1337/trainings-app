import styled from "styled-components";

const ImageContainer = styled.div`
    width: 150px;
    height: 150px;
    border: 2px solid ${({theme}) => theme.colors.seconary};

    position:relative;
`

export default ImageContainer;