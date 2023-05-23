import SubHeader from "@/components/Text/SubHeader";
import LinkButton from "@/components/Form/LinkButton";
import ContentWrapper from "@/components/Layout/Pages/noauth/ContentWrapper";
import GroupFlex from "@/components/Utils/GroupFlex";

function NoPermission() {
  return (
    <ContentWrapper>
      <SubHeader>You have no permission to access this page.</SubHeader>
      <GroupFlex gap="10px">
        <LinkButton href="/profile">My profile</LinkButton>
      </GroupFlex>
    </ContentWrapper>
  );
}

export default NoPermission;
