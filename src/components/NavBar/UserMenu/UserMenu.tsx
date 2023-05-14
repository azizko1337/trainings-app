import UserMenuContainer from "./UserMenuContainer";

let loggedIn = true;

function UserMenu(){
    if(loggedIn){
        return (
            <UserMenuContainer></UserMenuContainer>
        )
    }
    
    return (
        <UserMenuContainer></UserMenuContainer>
    )
}

export default UserMenu;