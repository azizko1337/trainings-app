import styled from "styled-components";

const Feedback = styled.span`
    width:250px;
    padding: 5px;
    font-size: ${({theme}) => theme.size.S};
    color: ${({theme}) => theme.colors.error};

    display:flex;
    justify-content: center;
    align-items: center;
`;

export default Feedback;