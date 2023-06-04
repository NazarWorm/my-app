import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Pages/LoginPage/Index';
import Posts from './Pages/PostsPage/Posts';
import Profiles from './Pages/ProfilePage/Profiles';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<><Index/></>}/>
        </Routes>
        <Routes>
          <Route path='/posts/' element={<><Posts/></>}/>
        </Routes>
        <Routes>
          <Route path='/profile/' element={<><Profiles/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
