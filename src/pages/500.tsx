import Header from "@/components/Text/Header";
import SubHeader from "@/components/Text/SubHeader";
import CenterWrapper from "@/components/Utils/CenterWrapper";

function Error500(){
    return(
        <CenterWrapper>
            <Header error>500</Header>
            <SubHeader>Internal server error. We are sorry :{"("}</SubHeader>
        </CenterWrapper>
    )
}

export default Error500;