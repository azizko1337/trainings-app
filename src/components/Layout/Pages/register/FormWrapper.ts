import styled from "styled-components";

const FormWrapper = styled.form`
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 20px;

    @media(orientation: portrait) {
        flex-direction: column-reverse;
    }
    
    @media(orientation: landscape){
        flex-grow:1;
    }
`

export default FormWrapper;