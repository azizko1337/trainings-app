import { ChangeEventHandler } from "react";
import InputContainer from "./InputContainer";
import InputLabel from "./InputLabel";
import InputInput from "./InputInput";
import Error from "./Error";

type Props = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  changeHandler: ChangeEventHandler;
  error?: string;
}

function Input(props: Props) {
  const {id, type, label, placeholder, value, changeHandler, error=""} = props;

  return (
    <InputContainer error={error.length>0}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputInput id={id} name={id} placeholder={placeholder} type={type} value={value} onChange={changeHandler}/>
      <Error error={error.length>0}>{error}</Error>
    </InputContainer>
  );
}

export default Input;