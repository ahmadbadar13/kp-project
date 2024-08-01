import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Admin/Dashboard';
import DivisiHP from './pages/Admin/DivisiHP';
import DivisiKURL from './pages/Admin/DivisiKURL';
import DivisiPDI from './pages/Admin/DivisiPDI';
import DivisiSPPP_SDM from './pages/Admin/DivisiSPPP_SDM';
import DivisiTP from './pages/Admin/DivisiTP';
import SubBagianHSDM from './pages/Admin/SubBagianHSDM';
import SubBagianKUL from './pages/Admin/SubBagianKUL';
import SubBagianPDI from './pages/Admin/SubBagianPDI';
import SubBagianTPPPH from './pages/Admin/SubBagianTPPPH';
import Sekretaris from './pages/Sekretaris/Sekretaris';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/DivisiHP" element={<DivisiHP />} />
        <Route path="/DivisiKURL" element={<DivisiKURL />} />
        <Route path="/DivisiPDI" element={<DivisiPDI />} />
        <Route path="/DivisiSPPP_SDM" element={<DivisiSPPP_SDM />} />
        <Route path="/DivisiTP" element={<DivisiTP />} />
        <Route path="/SubBagianHSDM" element={<SubBagianHSDM />} />
        <Route path="/SubBagianKUL" element={<SubBagianKUL />} />
        <Route path="/SubBagianPDI" element={<SubBagianPDI />} />
        <Route path="/SubBagianTPPPH" element={<SubBagianTPPPH />} />
        <Route path="/Sekretaris" element={<Sekretaris />} />
      </Routes>
    </Router>
  );
}

export default App;
