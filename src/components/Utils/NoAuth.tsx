import SubHeader from "@/components/Text/SubHeader";
import LinkButton from "@/components/Form/LinkButton";
import ContentWrapper from "@/components/Layout/Pages/noauth/ContentWrapper";
import GroupFlex from "@/components/Utils/GroupFlex";

function NoAuth() {
  return (
    <ContentWrapper>
      <SubHeader>You have to log in to access this page.</SubHeader>
      <GroupFlex gap="10px">
        <LinkButton href="/auth/login">Login</LinkButton>
        <LinkButton href="/auth/register">Register</LinkButton>
      </GroupFlex>
    </ContentWrapper>
  );
}

export default NoAuth;
