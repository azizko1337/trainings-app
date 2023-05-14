import Image from "next/image";
import Link from "next/link";
import NavBarContainer from "./NavBarContainer";
import NavBarMaxWidth from "./NavBarMaxWidth";
import AppIconContainer from "./AppIconContainer";
import Header from "../Text/Header";
import GroupFlex from "../Utils/GroupFlex";
import UserMenu from "./UserMenu/UserMenu";

function NavBar(){
    return (
        <NavBarContainer>
            <NavBarMaxWidth>
                <Link href="/">
                    <GroupFlex>
                        <AppIconContainer>
                            <Image src="/icons/appLogo.svg" alt="Graduation icon" fill={true}/>
                        </AppIconContainer>
                        <Header>Trainings</Header>
                    </GroupFlex>
                </Link>
                <UserMenu />
            </NavBarMaxWidth>
        </NavBarContainer>
    )
}

export default NavBar;