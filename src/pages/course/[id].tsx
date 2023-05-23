import { useContext, useState, useEffect, ChangeEvent, FormEvent } from "react";
import Router from "next/router";
import CourseValidate from "@/utils/CourseValidate";
import AuthContext from "@/context/AuthContext";
import type CourseInfo from "@/types/CourseInfo";
import SubHeader from "@/components/Text/SubHeader";
import Input from "@/components/Form/Input/Input";
import FormWrapper from "@/components/Layout/Pages/createCourse/FormWrapper";
import LeftColumn from "@/components/Layout/Pages/createCourse/LeftColumn";
import RightColumn from "@/components/Layout/Pages/createCourse/RightColumn";
import Legend from "@/components/Form/Fieldset/Legend";
import Fieldset from "@/components/Form/Fieldset/Fieldset";
import FieldsWrapper from "@/components/Form/Fieldset/FieldsWrapper";
import RadioInput from "@/components/Form/Fieldset/RadioInput";
import Select from "@/components/Form/Select/Select";
import Button from "@/components/Form/Button";
import ImageInput from "@/components/Form/ImageInput/ImageInput";
import Feedback from "@/components/Form/Feedback";
import UserFrontend from "@/types/UserFrontend";
import ParticipantsList from "@/components/ParticipantsList/ParticipantsList";
import AboutCourse from "@/components/AboutCourse/AboutCourse";

const CoursePage = () => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [participants, setParticipants] = useState<UserFrontend[]>([]);
  useEffect(() => {
    fetch(`/api/course/?id=${Router.query.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setCourse(data.course);
          setForm(data.course);
        } else {
          Router.push("/courses");
        }
      });
  }, []);
  useEffect(() => {
    fetch(`/api/course/getParticipants?id=${Router.query.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data.participants);
      });
  }, []);

  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({
    name: "",
    startDate: String(Date.now()),
    endDate: String(Date.now()),
    startTime: "",
    endTime: "",
    language: "",
    location: "",
    level: "easy",
    courseImage: "/default-placeholder.png",
  });
  const [errors, setErrors] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    language: "",
    location: "",
    level: "",
  });
  useEffect(() => {
    setErrors({
      name: CourseValidate.courseName(form.name),
      startDate: CourseValidate.startDate(form.startDate),
      endDate: CourseValidate.endDate(form.startDate, form.endDate),
      startTime: CourseValidate.time(form.startTime),
      endTime: CourseValidate.time(form.endTime),
      language: CourseValidate.language(form.language),
      location: CourseValidate.location(form.location),
      level: CourseValidate.level(form.level),
    });
  }, [form, setErrors]);

  function handleChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const id: string = target.id;

    if (id === "startDate" || id === "endDate") {
      const date = new Date(target.value);
      const timestamp = date.getTime();
      setForm({ ...form, [id]: timestamp });
    } else if (id === "en" || id === "pl") {
      const name: string = target.name;
      setForm({ ...form, [name]: target.value });
    } else if (id === "courseImage") {
      if (target.files === null) return;

      const file = target.files[0];
      if (file === null) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result === null) return;
        setForm({ ...form, courseImage: reader.result as string });
      };
      try {
        reader.readAsDataURL(file);
      } catch (err) {}
    } else {
      setForm({ ...form, [id]: target.value });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/course", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.ok) {
      await Router.push("/trainedCourses");
      Router.reload();
    } else {
      setFeedback(data.feedback);
    }
  }

  function shouldSubmitBeDisabled() {
    return !(
      form.endDate.length > 0 &&
      form.endTime.length > 0 &&
      form.language.length > 0 &&
      form.level.length > 0 &&
      form.location.length > 0 &&
      form.name.length > 0 &&
      form.startDate.length > 0 &&
      form.startTime.length > 0 &&
      (errors.name !== "" ||
        errors.startDate !== "" ||
        errors.endDate !== "" ||
        errors.startTime !== "" ||
        errors.endTime !== "" ||
        errors.language !== "" ||
        errors.location !== "" ||
        errors.level !== "")
    );
  }

  if (course?.trainerId === user?.id && user?.isTrainer === true)
    return (
      <>
        <FormWrapper onSubmit={handleSubmit}>
          <LeftColumn>
            <SubHeader>Update course</SubHeader>
            <span></span>
            <Input
              id="name"
              type="text"
              label="Name"
              placeholder="Type name"
              value={form.name}
              changeHandler={handleChange}
              error={errors.name}
            />
            <span></span>
            <Input
              id="startDate"
              type="date"
              label="Start date"
              placeholder=""
              value={new Date(+form.startDate).toISOString().split("T")[0]}
              changeHandler={handleChange}
              error={errors.startDate}
            />
            <Input
              id="endDate"
              type="date"
              label="End date"
              placeholder=""
              value={new Date(+form.endDate).toISOString().split("T")[0]}
              changeHandler={handleChange}
              error={errors.endDate}
            />
            <Input
              id="startTime"
              type="time"
              label="Start time"
              placeholder=""
              value={form.startTime}
              changeHandler={handleChange}
              error={errors.startTime}
            />
            <Input
              id="endTime"
              type="time"
              label="Start time"
              placeholder=""
              value={form.endTime}
              changeHandler={handleChange}
              error={errors.endTime}
            />
            <Fieldset id="language">
              <Legend>Language</Legend>
              <FieldsWrapper>
                <div>
                  <RadioInput
                    type="radio"
                    id="pl"
                    name="language"
                    value="pl"
                    checked={form.language === "pl"}
                    onChange={handleChange}
                  />{" "}
                  PL
                </div>
                <div>
                  <RadioInput
                    type="radio"
                    id="en"
                    name="language"
                    value="en"
                    checked={form.language === "en"}
                    onChange={handleChange}
                  />{" "}
                  EN
                </div>
              </FieldsWrapper>
            </Fieldset>
            <Feedback>{errors.language}</Feedback>
            <Input
              id="location"
              type="text"
              label="Location"
              placeholder="Type location"
              value={form.location}
              changeHandler={handleChange}
              error={errors.language}
            />
            <Select
              id="level"
              label="Level"
              value={form.level}
              options={["easy", "medium", "hard"]}
              changeHandler={handleChange}
              error={errors.level}
            />
            <Feedback>{feedback}</Feedback>
            <Button type="submit">Update course</Button>
          </LeftColumn>
          <RightColumn>
            <ImageInput
              id="courseImage"
              label="Select course image"
              selectedImage={form.courseImage}
              changeHandler={handleChange}
            />
          </RightColumn>
        </FormWrapper>
        <SubHeader>Participants list</SubHeader>
        <ParticipantsList participants={participants} />
      </>
    );
  return <AboutCourse course={course} />;
};

export default CoursePage;
