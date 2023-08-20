import React, { useState } from 'react';
import ApiUrl from '../constants/ApiUrl';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + ApiUrl.AUTH_TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        sessionStorage.setItem('authToken', data.token);
        window.location.href = '/';
      } else {
        setError('Invalid credentials.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Try again later.');
    }
  };

  return (
    <div className="App-body">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login Page</div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
