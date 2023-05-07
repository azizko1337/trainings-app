import Wrapper from "./Wrapper";
import NavBar from "../NavBar/NavBar";
import ContentMaxWidth from "./ContentMaxWidth";

function Layout(props: any){
    const {children} = props;

    return (
        <>
        <NavBar />
        <Wrapper>
            <ContentMaxWidth>
                {children}
            </ContentMaxWidth>
        </Wrapper>
        </>
    );
}

export default Layout;