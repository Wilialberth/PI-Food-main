const validation = (userData) => {

    const errors = {};

    if(!userData.email){
        errors.email = "You must enter an email";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)){
        errors.email = "The email entered is not valid";
    }

    if(!userData.password){
        errors.password = "You must enter a password";
    }
    else if(!/.*\d+.*/.test(userData.password)){
        errors.password = "Password must contain at least one number"
    }
    else if(userData.password.length < 6 ){
        errors.password = "The password must have more than 6 characters"
    }

    return errors;
}

export default validation