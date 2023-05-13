import { ChangeEvent, FormEvent, useState } from "react";
import FormWrapper from "@/components/Layout/Pages/register/FormWrapper";
import LeftColumn from "@/components/Layout/Pages/register/LeftColumn";
import RightColumn from "@/components/Layout/Pages/register/RightColumn";
import Input from "@/components/Form/Input/Input";
import Button from "@/components/Form/Button";
import SubHeader from "@/components/Text/SubHeader";
import Feedback from "@/components/Form/Feedback";
import ImageInput from "@/components/Form/ImageInput/ImageInput";

function Register(){
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
        profileImage: "/default-profile.jpg"
    });

    function handleChange(e: ChangeEvent){
        const target = e.target as HTMLInputElement;
        const id = target.id;
        const value = target.value;

        if(id === "profileImage"){
            if(target.files === null) return;

            const file = target.files[0];
            if(file === null) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                if(reader.result === null) return;
                setForm({...form, profileImage: reader.result as string});
            }
            reader.readAsDataURL(file);

            return;
        }

        setForm({
            ...form,
            [id]: value
        });
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        // TODO
    }

    return (
        <>
            <FormWrapper onSubmit={handleSubmit}>
                <LeftColumn>
                    <SubHeader>Register</SubHeader>
                    <span></span>
                    <Input id="email" type="text" label="Email" placeholder="Type email" value={form.email} changeHandler={handleChange} error={""}/>
                    <Input id="firstName" type="text" label="First name" placeholder="Type first name" value={form.firstName} changeHandler={handleChange} error={""}/>
                    <Input id="lastName" type="text" label="Last name" placeholder="Type last name" value={form.lastName} changeHandler={handleChange} error={""}/>
                    <Input id="password" type="password" label="Password" placeholder="Type password" value={form.password} changeHandler={handleChange} error={""}/>
                    <span></span>
                    <Input id="passwordConfirm" type="password" label="Confirm password" placeholder="Repeat password" value={form.passwordConfirm} changeHandler={handleChange} error={""}/>            
                    <Feedback error={true}>to handle:</Feedback>
                    <Button type="submit">Register</Button>
                </LeftColumn>
                <RightColumn>
                    <ImageInput id="profileImage" label="Profile picture" selectedImage={form.profileImage} changeHandler={handleChange}/>
                </RightColumn>
            </FormWrapper>
        </>
    )
}

export default Register;