import Header from "@/components/Text/Header";
import SubHeader from "@/components/Text/SubHeader";
import CenterWrapper from "@/components/Utils/CenterWrapper";

function Error404(){
    return(
        <CenterWrapper>
            <Header error>404</Header>
            <SubHeader>Page not found.</SubHeader>
        </CenterWrapper>
    )
}

export default Error404;