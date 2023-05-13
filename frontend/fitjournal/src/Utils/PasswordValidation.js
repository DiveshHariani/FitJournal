const passwordValidation = (password) => {
    let containsSpecialChar = false;
    let containsNumber = false
    let isLongEnough = password.length >= 8 ? true : false;
    let containsChar = false;
    for(let char of password) {    
        if(char === '!' || char === '@' || char === '#' || char === '$' || char === '%') {
            containsSpecialChar = true;
        } else if(char >= "0" && char <= "9") {
            containsNumber = true
        } else if((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            containsChar = true;
        }
    }

    return {isLongEnough, containsSpecialChar, containsNumber, containsChar};
}

export { passwordValidation };