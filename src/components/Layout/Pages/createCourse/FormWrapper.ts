import styled from "styled-components";

const FormWrapper = styled.form`
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: row;

    margin-top: 20px;

    @media(orientation: portrait) {
        flex-direction: column-reverse;
    }
`

export default FormWrapper;