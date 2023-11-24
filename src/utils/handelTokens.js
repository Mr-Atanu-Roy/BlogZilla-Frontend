const KEY = "BlogZilla-tokens";

//saves refresh token to local storage
function saveToken(token){
    deleteToken()
    if(token){
        localStorage.setItem(KEY, JSON.stringify(token));
    }
}

//gets and returns refresh token from local storage if exists
function getToken(){
    const tokenString = localStorage.getItem(KEY);
    if(tokenString){
        const token = JSON.parse(tokenString);
        return token;
    }
    return null;
}


//deletes refresh token from local storage
function deleteToken(){
    localStorage.removeItem(KEY);
}

export {saveToken, getToken, deleteToken}
