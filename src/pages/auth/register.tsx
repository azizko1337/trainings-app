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
import Router from "next/router";
import AuthContext from "@/context/AuthContext";
import AlreadyLoggedIn from "@/components/Utils/AlreadyLoggedIn";

function Register() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    profileImage: "/default-profile.jpg",
  });

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
      try {
        reader.readAsDataURL(file);
      } catch (err: any) {}

      return;
    }

    setForm({
      ...form,
      [id]: value,
    });
  }

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });
  useEffect(() => {
    setErrors({
      email: Validate.email(form.email, true),
      firstName: Validate.firstName(form.firstName, true),
      lastName: Validate.lastName(form.lastName, true),
      password: Validate.password(form.password, true),
      passwordConfirm: Validate.comparePasswords(
        form.password,
        form.passwordConfirm,
        true
      ),
    });
  }, [form, setErrors]);

  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        return setFeedback(data.feedback);
      }
      setFeedback("");
      await Router.push("/");
      Router.reload();
    } catch (err: any) {
      setFeedback("Error sending request to server.");
    }
  }

  function shouldSubmitBeDisabled() {
    return (
      form.email.length == 0 ||
      form.firstName.length == 0 ||
      form.lastName.length == 0 ||
      form.password.length == 0 ||
      form.passwordConfirm.length == 0 ||
      errors.email.length > 0 ||
      errors.firstName.length > 0 ||
      errors.lastName.length > 0 ||
      errors.password.length > 0 ||
      errors.passwordConfirm.length > 0
    );
  }

  if (user) return <AlreadyLoggedIn />;

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <LeftColumn>
          <SubHeader>Register</SubHeader>
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
            id="password"
            type="password"
            label="Password"
            placeholder="Type password"
            value={form.password}
            changeHandler={handleChange}
            error={errors.password}
          />
          <span></span>
          <Input
            id="passwordConfirm"
            type="password"
            label="Confirm password"
            placeholder="Repeat password"
            value={form.passwordConfirm}
            changeHandler={handleChange}
            error={errors.passwordConfirm}
          />
          <Feedback>{feedback}</Feedback>
          <Button type="submit" disabled={shouldSubmitBeDisabled()}>
            Register
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

export default Register;
