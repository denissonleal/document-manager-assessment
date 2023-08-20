import React, { useState, useEffect } from "react";
import ApiUrl from '../constants/ApiUrl';

function TopBar() {
  const [username, setUsername] = useState([]);

  const onLogout = async () => {
    const token = sessionStorage.getItem('authToken');

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + ApiUrl.LOGOUT, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro:', error);
    }

    sessionStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    const dataFetch = async () => {
      const token = sessionStorage.getItem('authToken');

      if (!token) {
        window.location.href = '/login/';
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + ApiUrl.USERS, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      if (!response.ok) {
        window.location.href = '/login/';
        return;
      }

      const authData = await response.json();

      if (authData.lenght > 0) {
        window.location.href = '/login/';
        return;
      }

      setUsername(authData[0].name);
    };

    dataFetch();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Hi, {username}!</span>
        <a href="/">Home</a>
        <button className="btn btn-outline-primary" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default TopBar;
