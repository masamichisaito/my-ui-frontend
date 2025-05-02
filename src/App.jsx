import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Confirm from './pages/Confirm';
import Complete from './pages/Complete';
import UserList from './pages/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/list" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
