import Input from "@/components/Form/Input/Input";

function CreateCourse(){
    return (
        <Input id="course-name" type="text" label="Name" placeholder="Type name" value="123" changeHandler={() => {}} error={"Required 4-20 characters."}/>
    )
}

export default CreateCourse;