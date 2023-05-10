import { ChangeEvent, FormEvent, useState } from "react";
import FormWrapper from "@/components/Layout/Pages/login/FormWrapper";
import Input from "@/components/Form/Input/Input";
import Button from "@/components/Form/Button";
import ButtonToRight from "@/components/Layout/Pages/login/ButtonToRight";
import SubHeader from "@/components/Text/SubHeader";
import ButtonToLeft from "@/components/Layout/Pages/login/ButtonToLeft";
import Feedback from "@/components/Form/Feedback";

function Login(){
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    function handleChange(e: ChangeEvent){
        const target = e.target as HTMLInputElement;
        const id = target.id;
        const value = target.value;

        setForm({
            ...form,
            [id]: value
        });
    }

    function submitForm(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        // TODODODO
        console.log("dupa")
        console.log(form)
    }

    return (
        <FormWrapper onSubmit={submitForm}>
            <ButtonToLeft><SubHeader>Login</SubHeader></ButtonToLeft>
            <Input id="email" type="text" label="Email" placeholder="Type email" value={form.email} changeHandler={handleChange} error={""}/>
            <Input id="password" type="password" label="Password" placeholder="Type password" value={form.password} changeHandler={handleChange} error={""}/>
            <Feedback error={true}>to handle:</Feedback>
            <ButtonToRight><Button type="submit">Login</Button></ButtonToRight>
        </FormWrapper>
    )
}

export default Login;