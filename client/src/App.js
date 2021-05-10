import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as api from './api/users.js'
import Header from './layout/Header';
import Home from './pages/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import UserContext from './context/userContext';
import './App.css';

function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await api.checkToken(token); 
      if (tokenResponse.data) {
        const userRes = await api.getUser(token); 
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
        </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
