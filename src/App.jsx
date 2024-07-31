import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DashboardAdmin from './pages/Admin/DashboardAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
