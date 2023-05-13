import { useState } from "react";
import FilterContainer from "./FilterContainer";
import OptionsContainer from "./Options/OptionsContainer";
import Option from "./Options/Option";
import type Filters from "@/types/Filters";
import toggleTextInStringArray from "@/utils/toggleTextInStringArrat";
import NavContainer from "./Options/NavContainer";
import Button from "@/components/Form/Button";

type Props = {
    filterName: string;
    options: string[];
    state: string[];
    setState: React.Dispatch<React.SetStateAction<string[]>>;
}

function Filter(props: Props){
    const { filterName, options = [], state, setState} = props;

    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            <FilterContainer onClick={() => setShowOptions(true)}>
                {filterName}
            </FilterContainer>
            <OptionsContainer show={showOptions}>
                {options.map((option, index) => <Option key={`${filterName}option${index}`} active={state.includes(option) || state.length===0} onClick={() => setState(toggleTextInStringArray(option, state))}>{option}</Option>)}
                <NavContainer>
                    <Button onClick={() => setShowOptions(false)} mini>{"<"}</Button>
                    <Button onClick={() => setState([])} mini>reset</Button>
                </NavContainer>
            </OptionsContainer>
        </>
    )
}

export default Filter;