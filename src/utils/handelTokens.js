//saves token to local storage
function saveToken(token){
    if(token){
        localStorage.setItem("BlogZilla-tokens", JSON.stringify(token));
    }
}

//gets and returns token from local storage if exists
function getToken(){
    const tokenString = localStorage.getItem("BlogZilla-tokens");
    if(tokenString){
        const token = JSON.parse(tokenString);
        return token;
    }
    return null;
}


//deletes token from local storage
function deleteToken(){
    localStorage.removeItem("BlogZilla-tokens");
}

export {saveToken, getToken, deleteToken}
