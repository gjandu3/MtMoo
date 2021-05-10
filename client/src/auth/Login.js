import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import UserContext from "../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import * as api from '../api/users.js'

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await api.login(loginUser)
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
    
    return (
        <div className="login">
            <h2 align="center">Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form align="center">
                <label>Email: </label> <br/>
                <TextField type="email" id="email" variant="outlined" onChange={e => setEmail(e.target.value)}/> <br/>
                <br/>
                <label>Password: </label> <br/> 
                <TextField type="password" id="password" variant="outlined" onChange={e => setPassword(e.target.value)}/> <br/>
                <br/>
                <Button  variant="contained" color="primary" onClick={submit}>Login</Button>
            </form>
        </div>
    );
}
 
export default Login;