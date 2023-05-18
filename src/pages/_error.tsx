import SubHeader from "@/components/Text/SubHeader";
import CenterWrapper from "@/components/Utils/CenterWrapper";

function Error(){
    return(
        <CenterWrapper>
            <SubHeader error>Internal server error. We are sorry :{"("}</SubHeader>
        </CenterWrapper>
    )
}
   
export default Error;