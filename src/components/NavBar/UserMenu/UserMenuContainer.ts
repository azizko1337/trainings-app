import styled from "styled-components";

type Props = {
    active: boolean;
}

const UserMenuContainer = styled.button<Props>`
    width: 50px;
    height: 50px;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: 50%;
    overflow: hidden;

    position: relative;

    cursor: pointer;

    ${props => props.active ? `
        border-width: 4px;
    ` : null}
`

export default UserMenuContainer;