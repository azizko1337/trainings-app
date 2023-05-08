import { ChangeEvent, useState } from "react";
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

function CreateCourse(){
    const [form, setForm] = useState({
        name: "",
        startDate: Date.now(),
        endDate: Date.now(),
        startTime: "",
        endTime: "",
        language: "",
        location: "",
        level: "easy",
        trainer: "",
        image: "/default-placeholder.png"
    });

    function handleChange(e: ChangeEvent){
        const target = e.target as HTMLInputElement;
        const id: string = target.id;
        
        if(id==="startDate" || id==="endDate"){
            const date = new Date(target.value);
            const timestamp = date.getTime();
            setForm({...form, [id]: timestamp});
        }else if(id === "en" || id === "pl"){
            const name: string = target.name;
            setForm({...form, [name]: target.value});
        }else if(id === "image"){
            if(target.files === null) return;

            const file = target.files[0];
            if(file === null) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                if(reader.result === null) return;
                setForm({...form, image: reader.result as string});
            }
            reader.readAsDataURL(file);
        }
        else{
            setForm({...form, [id]: target.value});
        }
    }

    
    return (
        <>
            <SubHeader>Create new course</SubHeader>
            <FormWrapper>
                <LeftColumn>
                    <Input id="name" type="text" label="Name" placeholder="Type name" value={form.name} changeHandler={handleChange} error={""}/>
                    <span></span>
                    <Input id="startDate" type="date" label="Start date" placeholder="" value={new Date(form.startDate).toISOString().split('T')[0]} changeHandler={handleChange} error={""}/>
                    <Input id="endDate" type="date" label="End date" placeholder="" value={new Date(form.endDate).toISOString().split('T')[0]} changeHandler={handleChange} error={""}/>
                    <Input id="startTime" type="time" label="Start time" placeholder="" value={form.startTime} changeHandler={handleChange} error={""}/>
                    <Input id="endTime" type="time" label="Start time" placeholder="" value={form.endTime} changeHandler={handleChange} error={""}/>
                    <Fieldset id="language">
                        <Legend>Language</Legend>
                        <FieldsWrapper>
                            <div><RadioInput type="radio" id="pl" name="language" value="pl" checked={form.language==="pl"} onChange={handleChange}/> PL</div>
                            <div><RadioInput type="radio" id="en" name="language" value="en" checked={form.language==="en"} onChange={handleChange}/> EN</div>
                        </FieldsWrapper>
                    </Fieldset>
                    <span></span>
                    <Input id="location" type="text" label="Location" placeholder="Type location" value={form.location} changeHandler={handleChange} error={""}/>
                    <Select id="level" label="Level" value={form.level} options={["easy", "medium", "hard"]} changeHandler={handleChange}/>
                    <Input id="trainer" type="text" label="Trainer" placeholder="Type trainer name" value={form.trainer} changeHandler={handleChange} error={""}/>
                    <span></span>
                    <Button type="submit">Add course</Button>
                </LeftColumn>
                <RightColumn>
                    <ImageInput id="image" label="Select course image" selectedImage={form.image} changeHandler={handleChange}/>
                </RightColumn>
            </FormWrapper>
        </>
    )
}

export default CreateCourse;