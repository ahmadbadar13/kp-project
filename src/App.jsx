import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Operator/Login-Op';
import Dashboard from './pages/Operator/Dashboard-Op';
import DivisiHP from './pages/Operator/DivisiHP-Op';
import DivisiKURL from './pages/Operator/DivisiKURL-Op';
import DivisiPDI from './pages/Operator/DivisiPDI-Op';
import DivisiSPPP_SDM from './pages/Operator/DivisiSPPP_SDM-Op';
import DivisiTP from './pages/Operator/DivisiTP-Op';
import SubBagianHSDM from './pages/Operator/SubBagianHSDM-Op';
import SubBagianKUL from './pages/Operator/SubBagianKUL-Op';
import SubBagianPDI from './pages/Operator/SubBagianPDI-Op';
import SubBagianTPPPH from './pages/Operator/SubBagianTPPPH-Op';
import Sekretaris from './pages/Operator/Sekretaris-Op';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login-Op" element={<Login />} />
        <Route path="/Dashboard-Op" element={<Dashboard />} />
        <Route path="/DivisiHP-Op" element={<DivisiHP />} />
        <Route path="/DivisiKURL-Op" element={<DivisiKURL />} />
        <Route path="/DivisiPDI-Op" element={<DivisiPDI />} />
        <Route path="/DivisiSPPP_SDM-Op" element={<DivisiSPPP_SDM />} />
        <Route path="/DivisiTP-Op" element={<DivisiTP />} />
        <Route path="/SubBagianHSDM-Op" element={<SubBagianHSDM />} />
        <Route path="/SubBagianKUL-Op" element={<SubBagianKUL />} />
        <Route path="/SubBagianPDI-Op" element={<SubBagianPDI />} />
        <Route path="/SubBagianTPPPH-Op" element={<SubBagianTPPPH />} />
        <Route path="/Sekretaris-Op" element={<Sekretaris />} />
      </Routes>
    </Router>
  );
}

export default App;
