class Validate{
    static email(email: string, frontend: boolean): string{
        if(frontend && email.length === 0) return "";
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return "Email is invalid";
        }else{
            return "";
        }
    }

    static firstName(firstName: string, frontend: boolean): string{
        if(frontend && firstName.length === 0) return "";
        if(firstName.length < 2){
            return "First name must be at least 2 characters";
        }
        else if(firstName.length > 20){
            return "First name must be less than 21 characters";
        }
        else{
            return "";
        }
    }

    static lastName(lastName: string, frontend: boolean): string{
        if(frontend && lastName.length === 0) return "";
        if(lastName.length < 2){
            return "Last name must be at least 2 characters";
        }
        else if(lastName.length > 36){
            return "Last name must be less than 37 characters";
        }
        else{
            return "";
        }
    }

    static password(password: string, frontend: boolean): string{
        if(frontend && password.length === 0) return "";
        if(password.length < 8){
            return "Password must be at least 8 characters";
        }
        else if(password.length > 64){
            return "Password must be less than 65 characters";
        }
        else{
            return "";
        }
    }

    static comparePasswords(password: string, confirmPassword: string, frontend: boolean): string{

        if(password !== confirmPassword){
            return "Passwords do not match";
        }
        else{
            return "";
        }
    }
}

export default Validate;