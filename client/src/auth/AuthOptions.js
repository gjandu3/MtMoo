import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Button } from 'semantic-ui-react';
import UserContext from "../context/userContext";

function AuthOptions () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token","");
    };

    return (
        <Menu.Item className="auth-options">
            {userData.user ? (
                <Button className="btn btn-primary mr-2" onClick={logout}>Logout</Button>
            ) : (
                <>
                <Button className="btn btn-primary mr-2" onClick={register}>Sign Up</Button>
                <Button className="btn btn-primary mr-2" onClick={login}>Login</Button>
                </>
            )}
        </Menu.Item>
    )
}

export default AuthOptions;