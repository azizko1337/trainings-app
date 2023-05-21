import { useState, useContext, MouseEvent } from "react";
import Image from "next/image";
import UserMenuContainer from "./UserMenuContainer";
import Options from "./Options/Options";
import Option from "./Options/Option";
import AuthContext from "@/context/AuthContext";
import Router from "next/router";

function UserMenu() {
  const { user } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  console.log(user);

  async function handleLogout(e: MouseEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/logout", {
      method: "GET",
    });
    await Router.push("/");
    Router.reload();
  }

  return (
    <>
      <UserMenuContainer
        active={showOptions}
        onClick={() => setShowOptions(!showOptions)}
      >
        <Image
          src={
            showOptions
              ? "/icons/X-icon.png"
              : user
              ? user.profileImage
              : "/default-profile.jpg"
          }
          fill={true}
          alt="My account"
        />
      </UserMenuContainer>

      <Options show={showOptions} onClick={() => setShowOptions(false)}>
        {user ? (
          user.isTrainer ? (
            <>
              <Option href="/courses">My courses</Option>
              <Option href="/trainedCourses">My courses (trainer)</Option>
              <Option href="/createCourse">Create course</Option>
              <Option href="/profile">Profile settings</Option>
              <Option onClick={handleLogout} href="/">
                Logout
              </Option>
            </>
          ) : (
            <>
              <Option href="/courses">My courses</Option>
              <Option href="/profile">Profile settings</Option>
              <Option onClick={handleLogout} href="/">
                Logout
              </Option>
            </>
          )
        ) : (
          <>
            <Option href="/auth/login">Login</Option>
            <Option href="/auth/register">Register</Option>
          </>
        )}
      </Options>
    </>
  );
}

export default UserMenu;
