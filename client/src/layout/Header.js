import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import UserContext from "../context/userContext";

export default function Header() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const home = () => history.push("/"); 
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token","");
    };
    
    return ( 
            <div className="auth-options">
                {userData.user ? (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit" onClick={home}>Mt.Moo</Button>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </>
                ) : (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit" onClick={home}>Mt.Moo</Button>
                            <Button color="inherit" onClick={login}>Login</Button>
                            <Button color="inherit" onClick={register}>Register</Button>
                        </Toolbar>
                    </AppBar>
                </>
                )}
            </div>
    );
}
 