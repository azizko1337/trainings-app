import styled from "styled-components";

const FilterContainer = styled.li`
    display: flex;
    justify-content: space-between;

    padding: 5px;
    
    cursor: pointer;

    font-size: ${({theme}) => theme.size.M};

    z-index:1;

    &:hover{
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.background};
    }
`;

export default FilterContainer;