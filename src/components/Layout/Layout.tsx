import Wrapper from "./Wrapper";
import NavBar from "../NavBar/NavBar";
import ContentMaxWidth from "./ContentMaxWidth";
import Footer from "../Footer/Footer";

function Layout(props: any) {
  const { children } = props;

  return (
    <>
      <NavBar />
      <Wrapper>
        <ContentMaxWidth>{children}</ContentMaxWidth>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Layout;
