import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import UserContext from "../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import * as api from '../api/users.js'

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, displayName};
            await api.register(newUser); 
            const logData = {email, password}
            const loginResponse = await api.login(logData)
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
        <div className="register">
            <h2 align="center">Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form align="center" onSubmit={submit}>
                <label>Email: </label> <br/>
                <TextField variant="outlined" type="email" id="email" onChange={e => setEmail(e.target.value)}/> <br/>
                <br/>
                <label>Password: </label> <br/>
                <TextField variant="outlined" type="password" id="password" onChange={e => setPassword(e.target.value)}/> <br/>
                <br/>
                <TextField variant="outlined" type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/> <br/>
                <br/>
                <label>Display name:</label> <br/>
                <TextField id="display-name" variant="outlined" onChange={e => setDisplayName(e.target.value)}/> <br/>
                <br/>
                <Button variant="contained" color="primary" onClick={submit}>Register</Button>
            </form>
        </div>
        );
}
 
export default Register;