import { useSelector } from "react-redux";

const IndexRoute = () => {
    const userState = useSelector(state => state.userReducer);
    return (
        <h1>Home Page {userState.isUserLoggedIn ? "T" : "F"} {userState.userTokenId}</h1>
    );
}

export default IndexRoute;