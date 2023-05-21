import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import FormWrapper from "@/components/Layout/Pages/register/FormWrapper";
import LeftColumn from "@/components/Layout/Pages/register/LeftColumn";
import RightColumn from "@/components/Layout/Pages/register/RightColumn";
import Input from "@/components/Form/Input/Input";
import Button from "@/components/Form/Button";
import SubHeader from "@/components/Text/SubHeader";
import Feedback from "@/components/Form/Feedback";
import ImageInput from "@/components/Form/ImageInput/ImageInput";
import Validate from "@/utils/Validate";
import type ProfileForm from "@/types/ProfileForm";
import AuthContext from "@/context/AuthContext";
import Router from "next/router";

function Profile() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState<ProfileForm>({
    email: "",
    firstName: "",
    lastName: "",
    newPassword: "",
    oldPassword: "",
    profileImage: "/default-profile.jpg",
  });

  useEffect(() => {
    if (user === null) return;
    setForm({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      newPassword: "",
      oldPassword: "",
      profileImage: user.profileImage,
    });
  }, [user]);

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
      oldPassword: Validate.oldPassword(form.oldPassword),
    });
  }, [form, setErrors]);

  const [feedback, setFeedback] = useState("");

  function handleChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;

    if (id === "profileImage") {
      if (target.files === null) return;

      const file = target.files[0];
      if (file === null) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result === null) return;
        setForm({ ...form, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);

      return;
    }

    setForm({
      ...form,
      [id]: value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.ok) {
      Router.reload();
    } else {
      setFeedback(data.feedback);
    }
  }

  function shouldSubmitBeDisabled() {
    return (
      (form.email.length == 0 &&
        form.firstName.length == 0 &&
        form.lastName.length == 0) ||
      errors.email.length > 0 ||
      errors.firstName.length > 0 ||
      errors.lastName.length > 0 ||
      errors.oldPassword.length > 0 ||
      errors.newPassword.length > 0
    );
  }

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <LeftColumn>
          <SubHeader>My profile</SubHeader>
          <span></span>
          <Input
            id="email"
            type="text"
            label="Email"
            placeholder="Type email"
            value={form.email}
            changeHandler={handleChange}
            error={errors.email}
          />
          <Input
            id="firstName"
            type="text"
            label="First name"
            placeholder="Type first name"
            value={form.firstName}
            changeHandler={handleChange}
            error={errors.firstName}
          />
          <Input
            id="lastName"
            type="text"
            label="Last name"
            placeholder="Type last name"
            value={form.lastName}
            changeHandler={handleChange}
            error={errors.lastName}
          />
          <Input
            id="newPassword"
            type="password"
            label="New password"
            placeholder="(Optional)"
            value={form.newPassword}
            changeHandler={handleChange}
            error={errors.newPassword}
          />
          <span></span>
          <span></span>
          <div></div>
          <div></div>
          <div></div>
          <Input
            id="oldPassword"
            type="password"
            label="Current password"
            placeholder="Type current password"
            value={form.oldPassword}
            changeHandler={handleChange}
            error={errors.oldPassword}
          />
          <Feedback>{feedback}</Feedback>
          <Button type="submit" disabled={shouldSubmitBeDisabled()}>
            Change
          </Button>
        </LeftColumn>
        <RightColumn>
          <ImageInput
            id="profileImage"
            label="Profile picture"
            selectedImage={form.profileImage}
            changeHandler={handleChange}
          />
        </RightColumn>
      </FormWrapper>
    </>
  );
}

export default Profile;
