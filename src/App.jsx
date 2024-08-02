import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import DivisiHP from './pages/DivisiHP';
import DivisiKURL from './pages/DivisiKURL';
import DivisiPDI from './pages/DivisiPDI';
import DivisiSPPP_SDM from './pages/DivisiSPPP_SDM';
import DivisiTP from './pages/DivisiTP';
import SubBagianHSDM from './pages/SubBagianHSDM';
import SubBagianKUL from './pages/SubBagianKUL';
import SubBagianPDI from './pages/SubBagianPDI';
import SubBagianTPPPH from './pages/SubBagianTPPPH';
import Sekretaris from './pages/Sekretaris';

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
