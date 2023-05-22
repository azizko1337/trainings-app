import Image from "next/image";
import FooterContainer from "./FooterContainer";
import FooterMaxWidth from "./FooterMaxWidth";
import GithubLink from "./GithubLink";

function Footer() {
  return (
    <FooterContainer>
      <FooterMaxWidth>
        <GithubLink
          target="_blank"
          href="https://github.com/azizko1337/trainings-app"
        >
          <Image src="/icons/github.png" fill={true} alt="Github link" />
        </GithubLink>
      </FooterMaxWidth>
    </FooterContainer>
  );
}

export default Footer;
