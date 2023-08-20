import React from 'react';
import '../resources/css/App.css';
import FileVersions from './FileVersions'
import LoginPage from './LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<FileVersions/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
