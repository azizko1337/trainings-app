import styled from "styled-components";

const FormWrapper = styled.form`
    width: 100%;
    min-height: 100%;
    flex-grow:1;

    display: flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;

    gap:20px;
    
    @media(orientation:portrait){
        align-items: flex-end;
    }
`

export default FormWrapper;