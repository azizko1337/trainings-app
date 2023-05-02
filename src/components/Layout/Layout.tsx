import Wrapper from "./Wrapper";
import NavBar from "../NavBar/NavBar";

function Layout(props: any){
    const {children} = props;

    return (
        <>
        <NavBar />
        <Wrapper>
            {children}
        </Wrapper>
        </>
    );
}

export default Layout;