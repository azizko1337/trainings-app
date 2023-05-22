import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useContext,
  MouseEvent,
} from "react";
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
  }, [user, setForm]);

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

  const [deleteForm, setDeleteForm] = useState({
    oldPassword: "",
  });
  const [errorsDelete, setErrorsDelete] = useState({
    oldPassword: "",
  });
  useEffect(() => {
    setErrorsDelete({
      oldPassword: Validate.deleteOldPassword(deleteForm.oldPassword),
    });
  }, [deleteForm, setErrorsDelete]);
  function handleDeleteChange(e: FormEvent) {
    const target = e.target as HTMLInputElement;
    setDeleteForm({
      oldPassword: target.value,
    });
  }
  function shouldDeletionBeDisabled() {
    return errorsDelete.oldPassword.length > 0;
  }
  const [deleteProgression, setDeleteProgression] = useState(0);
  const [deleteFeedback, setDeleteFeedback] = useState("");
  async function handleDeleteProfile(e: MouseEvent) {
    e.preventDefault();
    setDeleteProgression(deleteProgression + 1);
    if (deleteProgression + 1 >= 5) {
      setDeleteProgression(0);
      try {
        const res = await fetch("/api/auth/user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deleteForm),
        });
        const data = await res.json();
        if (data.ok) {
          await Router.push("/");
          Router.reload();
        } else {
          setDeleteFeedback(data.feedback);
        }
      } catch (e: any) {
        setDeleteFeedback("Error communicating with server.");
      }
    }
  }
  function shouldTrainerBeDisabled() {
    return errorsTrainer.code.length > 0;
  }

  const [trainerForm, setTrainerForm] = useState({
    code: "",
  });
  const [trainerFeedback, setTrainerFeedback] = useState("");
  const [errorsTrainer, setErrorsTrainer] = useState({
    code: "",
  });
  useEffect(() => {
    setErrorsTrainer({
      code: Validate.becomeTrainerCode(trainerForm.code),
    });
  }, [trainerForm, setErrorsTrainer]);
  async function handleBecomeTrainer(e: MouseEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/trainer/become", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainerForm),
      });
      const data = await res.json();
      if (data.ok) {
        Router.reload();
      } else {
        setTrainerFeedback(data.feedback);
      }
    } catch (e: any) {
      setTrainerFeedback("Error communicating with server.");
    }
  }
  function handleTrainerChange(e: FormEvent) {
    const target = e.target as HTMLInputElement;
    setTrainerForm({
      code: target.value,
    });
  }

  const [ceaseForm, setCeaseForm] = useState({
    oldPassword: "",
  });
  const [errorsCease, setErrorsCease] = useState({
    oldPassword: "",
  });
  useEffect(() => {
    setErrorsCease({
      oldPassword: Validate.ceaseTrainerPassword(ceaseForm.oldPassword),
    });
  }, [ceaseForm, setErrorsCease]);
  function handleCeaseChange(e: FormEvent) {
    const target = e.target as HTMLInputElement;
    setCeaseForm({
      oldPassword: target.value,
    });
  }
  function shouldCeaseBeDisabled() {
    return errorsCease.oldPassword.length > 0;
  }
  const [ceaseProgression, setCeaseProgression] = useState(0);
  const [ceaseFeedback, setCeaseFeedback] = useState("");
  async function handleCeaseBeingTrainer(e: MouseEvent) {
    e.preventDefault();
    setCeaseProgression(ceaseProgression + 1);
    if (ceaseProgression + 1 >= 5) {
      setCeaseProgression(0);
      try {
        const res = await fetch("/api/auth/trainer/cease", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ceaseForm),
        });
        const data = await res.json();
        if (data.ok) {
          Router.reload();
        } else {
          setCeaseFeedback(data.feedback);
        }
      } catch (e: any) {
        setCeaseFeedback("Error communicating with server.");
      }
    }
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
            Change data
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
      <FormWrapper>
        <LeftColumn>
          <SubHeader>Delete profile</SubHeader>
          <span></span>
          <Input
            id="deleteOldPassword"
            type="password"
            label="Current password"
            placeholder="Type current password"
            value={deleteForm.oldPassword}
            changeHandler={handleDeleteChange}
            error={errorsDelete.oldPassword}
          />
          <Button
            fixed={true}
            type="submit"
            onClick={handleDeleteProfile}
            disabled={shouldDeletionBeDisabled()}
          >
            Delete profile {`${deleteProgression}/5`}
          </Button>
          <span></span>
          <Feedback>{deleteFeedback}</Feedback>
        </LeftColumn>
        <LeftColumn>
          {user?.isTrainer ? (
            <>
              <SubHeader>Cease being trainer</SubHeader>
              <span></span>
              <Input
                id="ceaseTrainerOldPassword"
                type="password"
                label="Current password"
                placeholder="Type current password"
                value={ceaseForm.oldPassword}
                changeHandler={handleCeaseChange}
                error={errorsCease.oldPassword}
              />
              <Button
                fixed={true}
                type="submit"
                onClick={handleCeaseBeingTrainer}
                disabled={shouldCeaseBeDisabled()}
              >
                Stop being trainer {`${ceaseProgression}/5`}
              </Button>
              <span></span>
              <Feedback>{ceaseFeedback}</Feedback>
            </>
          ) : (
            <>
              <SubHeader>Be trainer</SubHeader>
              <span></span>
              <Input
                id="becomeTrainerCode"
                type="text"
                label="Trainer code"
                placeholder="Type trainer code you got"
                value={trainerForm.code}
                changeHandler={handleTrainerChange}
                error={errorsTrainer.code}
              />
              <Button
                fixed={true}
                type="submit"
                onClick={handleBecomeTrainer}
                disabled={shouldTrainerBeDisabled()}
              >
                Become trainer
              </Button>
              <span></span>
              <Feedback>{trainerFeedback}</Feedback>
            </>
          )}
        </LeftColumn>
      </FormWrapper>
    </>
  );
}

export default Profile;
