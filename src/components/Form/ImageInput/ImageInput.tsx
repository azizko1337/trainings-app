import Image from "next/image";
import Container from "./Container";
import Label from "./Label";
import InputInput from "./InputInput";
import ImageContainer from "./ImageContainer";
import { ChangeEventHandler } from "react";

type Props = {
    id: string;
    label: string;
    selectedImage: string;
    changeHandler: ChangeEventHandler<HTMLInputElement>;
}

function ImageInput(props: Props){
    const {id, label, selectedImage, changeHandler} = props;

    return (
        <Container>
            <Label htmlFor={id}>{label}</Label>
            <InputInput id={id} name={id} type="file" accept="image/*" onChange={changeHandler}/>
            <ImageContainer>
                <Image src={selectedImage} alt="React" fill={true}/>
            </ImageContainer>
        </Container>
    )
}

export default ImageInput;