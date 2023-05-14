import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FormWrapper from "@/components/Layout/Pages/register/FormWrapper";
import LeftColumn from "@/components/Layout/Pages/register/LeftColumn";
import RightColumn from "@/components/Layout/Pages/register/RightColumn";
import Input from "@/components/Form/Input/Input";
import Button from "@/components/Form/Button";
import SubHeader from "@/components/Text/SubHeader";
import Feedback from "@/components/Form/Feedback";
import ImageInput from "@/components/Form/ImageInput/ImageInput";
import Validate from "@/utils/Validate";

function Profile(){
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        newPassword: "",
        oldPassword: "",
        profileImage: "/default-profile.jpg"
    });
    
    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        newPassword: "",
        oldPassword: "",
    });
    useEffect(() => {
        setErrors({
            email: Validate.email(form.email, true),
            firstName: Validate.firstName(form.firstName, true),
            lastName: Validate.lastName(form.lastName, true),
            newPassword: Validate.password(form.newPassword, true),
            oldPassword: Validate.password(form.oldPassword, true),

        })
    }, [form, setErrors]);

    const [feedback, setFeedback] = useState("");

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
        setFeedback("Response from server");
        // TODO
    }

    return (
        <>
            <FormWrapper onSubmit={handleSubmit}>
                <LeftColumn>
                    <SubHeader>My profile</SubHeader>
                    <span></span>
                    <Input id="email" type="text" label="Email" placeholder="Type email" value={form.email} changeHandler={handleChange} error={errors.email}/>
                    <Input id="firstName" type="text" label="First name" placeholder="Type first name" value={form.firstName} changeHandler={handleChange} error={errors.firstName}/>
                    <Input id="lastName" type="text" label="Last name" placeholder="Type last name" value={form.lastName} changeHandler={handleChange} error={errors.lastName}/>
                    <Input id="newPassword" type="password" label="New password" placeholder="(Optional)" value={form.newPassword} changeHandler={handleChange} error={errors.newPassword}/>
                    <span></span>
                    <span></span>
                    <div></div>
                    <div></div>
                    <div></div>
                    <Input id="oldPassword" type="password" label="Current password" placeholder="Type current password" value={form.oldPassword} changeHandler={handleChange} error={errors.oldPassword}/>            
                    <Feedback>{feedback}</Feedback>
                    <Button type="submit">Change</Button>
                </LeftColumn>
                <RightColumn>
                    <ImageInput id="profileImage" label="Profile picture" selectedImage={form.profileImage} changeHandler={handleChange}/>
                </RightColumn>
            </FormWrapper>
        </>
    )
}

export default Profile;