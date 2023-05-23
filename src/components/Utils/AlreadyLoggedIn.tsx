import SubHeader from "@/components/Text/SubHeader";
import LinkButton from "@/components/Form/LinkButton";
import ContentWrapper from "@/components/Layout/Pages/noauth/ContentWrapper";
import GroupFlex from "@/components/Utils/GroupFlex";

function AlreadyLoggedIn() {
  return (
    <ContentWrapper>
      <SubHeader>You are already logged in.</SubHeader>
      <GroupFlex gap="10px">
        <LinkButton href="/profile">Profile</LinkButton>
      </GroupFlex>
    </ContentWrapper>
  );
}

export default AlreadyLoggedIn;
