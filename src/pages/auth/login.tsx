import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import FormWrapper from "@/components/Layout/Pages/login/FormWrapper";
import Input from "@/components/Form/Input/Input";
import Button from "@/components/Form/Button";
import ButtonToRight from "@/components/Layout/Pages/login/ButtonToRight";
import SubHeader from "@/components/Text/SubHeader";
import ButtonToLeft from "@/components/Layout/Pages/login/ButtonToLeft";
import Feedback from "@/components/Form/Feedback";
import Validate from "@/utils/Validate";

function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const value = target.value;

    setForm({
      ...form,
      [id]: value,
    });
  }

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrors({
      email: Validate.email(form.email, true),
      password: Validate.password(form.password, true),
    });
  }, [form, setErrors]);

  const [feedback, setFeedback] = useState("");

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
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
      (form.email.length == 0 && form.password.length == 0) ||
      errors.email.length > 0 ||
      errors.password.length > 0
    );
  }

  return (
    <FormWrapper onSubmit={submitForm}>
      <ButtonToLeft>
        <SubHeader>Login</SubHeader>
      </ButtonToLeft>
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
        id="password"
        type="password"
        label="Password"
        placeholder="Type password"
        value={form.password}
        changeHandler={handleChange}
        error={errors.password}
      />
      <Feedback>{feedback}</Feedback>
      <ButtonToRight>
        <Button type="submit" disabled={shouldSubmitBeDisabled()}>
          Login
        </Button>
      </ButtonToRight>
    </FormWrapper>
  );
}

export default Login;
