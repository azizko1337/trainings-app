import { useState } from "react";
import Image from "next/image";
import UserMenuContainer from "./UserMenuContainer";
import Options from "./Options/Options";
import Option from "./Options/Option";

let loggedIn = false;

function UserMenu() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <UserMenuContainer
        active={showOptions}
        onClick={() => setShowOptions(!showOptions)}
      >
        <Image
          src={showOptions ? "/icons/X-icon.png" : "/default-profile.jpg"}
          fill={true}
          alt="My account"
        />
      </UserMenuContainer>

      <Options show={showOptions} onClick={() => setShowOptions(false)}>
        {loggedIn ? (
          <>
            <Option href="/courses">My courses</Option>
            <Option href="/profile">Profile settings</Option>
            <Option href="/auth/logout">Logout</Option>
          </>
        ) : (
          <Option href="/auth/login">Login</Option>
        )}
      </Options>
    </>
  );
}

export default UserMenu;
