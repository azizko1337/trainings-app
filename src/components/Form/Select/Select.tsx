import { ChangeEventHandler } from "react";
import InputContainer from "../Input/InputContainer";
import InputLabel from "../Input/InputLabel";
import SelectSelect from "./SelectSelect";
import Option from "./Option";
import Error from "../Input/Error";


type Props = {
    id: string;
    label: string;
    value: string;
    changeHandler: ChangeEventHandler;
    options: string[];
    multiple?: boolean;
    error?: string;
}

function Select(props: Props){
    const {id, label, value, changeHandler, options, multiple=false, error=""} = props;

    return (
        <InputContainer error={error.length>0}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <SelectSelect multiple={multiple} id={id} name={id} value={value} onChange={changeHandler}>
                {options.map((option, index) => <Option key={index} value={option}>{option}</Option>)}
            </SelectSelect>
            <Error error={error.length>0}>{error}</Error>
        </InputContainer>
    )
}

export default Select;