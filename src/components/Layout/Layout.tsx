import Wrapper from "./Wrapper";

function Layout(props: any){
    const {children} = props;

    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

export default Layout;