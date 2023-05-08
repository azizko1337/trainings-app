import Image from "next/image";
import NavBarContainer from "./NavBarContainer";
import NavBarMaxWidth from "./NavBarMaxWidth";
import AppIconContainer from "./AppIconContainer";
import Header from "../Text/Header";
import GroupFlex from "../Utils/GroupFlex";

function NavBar(){
    return (
        <NavBarContainer>
            <NavBarMaxWidth>
                <GroupFlex>
                    <AppIconContainer>
                        <Image src="/icons/appLogo.svg" alt="Graduation icon" fill={true}/>
                    </AppIconContainer>
                    <Header>Trainings</Header>
                </GroupFlex>
            </NavBarMaxWidth>
        </NavBarContainer>
    )
}

export default NavBar;