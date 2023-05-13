import initialState from "./userState";

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "user/login": 
            return {
                ...state,
                "isUserLoggedIn": true,
                "userTokenId": action.payload
            };
        case "user/logout": 
            return {
                ...state,
                "isUserLoggedIn": false,
                "userTokenId": ""
            };
        default: return state;
    }
}

export default userReducer;