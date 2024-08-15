import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin
import LoginAdm from './pages/Admin/Login-Adm';
import Dashboard from './pages/Admin/Dashboard-Adm';
import DivisiHP from './pages/Admin/DivisiHP-Adm';
import DivisiKURL from './pages/Admin/DivisiKURL-Adm';
import DivisiPDI from './pages/Admin/DivisiPDI-Adm';
import DivisiSPPP_SDM from './pages/Admin/DivisiSPPP_SDM-Adm';
import DivisiTP from './pages/Admin/DivisiTP-Adm';
import SubBagianHSDM from './pages/Admin/SubBagianHSDM-Adm';
import SubBagianKUL from './pages/Admin/SubBagianKUL-Adm';
import SubBagianPDI from './pages/Admin/SubBagianPDI-Adm';
import SubBagianTPPPH from './pages/Admin/SubBagianTPPPH-Adm';
import Sekretaris from './pages/Admin/Sekretaris-Adm';

// Operator
import Login_Op from './pages/Operator/Login-Op';
import Dashboard_Op from './pages/Operator/Dashboard-Op';
import DivisiHP_Op from './pages/Operator/DivisiHP-Op';
import DivisiKURL_Op from './pages/Operator/DivisiKURL-Op';
import DivisiPDI_Op from './pages/Operator/DivisiPDI-Op';
import DivisiSPPP_SDM_Op from './pages/Operator/DivisiSPPP_SDM-Op';
import DivisiTP_Op from './pages/Operator/DivisiTP-Op';
import SubBagianHSDM_Op from './pages/Operator/SubBagianHSDM-Op';
import SubBagianKUL_Op from './pages/Operator/SubBagianKUL-Op';
import SubBagianPDI_Op from './pages/Operator/SubBagianPDI-Op';
import SubBagianTPPPH_Op from './pages/Operator/SubBagianTPPPH-Op';
import Sekretaris_Op from './pages/Operator/Sekretaris-Op';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/Login-Adm" element={<LoginAdm />} />
        <Route path="/Dashboard-Adm" element={<Dashboard />} />
        <Route path="/DivisiHP-Adm" element={<DivisiHP />} />
        <Route path="/DivisiKURL-Adm" element={<DivisiKURL />} />
        <Route path="/DivisiPDI-Adm" element={<DivisiPDI />} />
        <Route path="/DivisiSPPP_SDM-Adm" element={<DivisiSPPP_SDM />} />
        <Route path="/DivisiTP-Adm" element={<DivisiTP />} />
        <Route path="/SubBagianHSDM-Adm" element={<SubBagianHSDM />} />
        <Route path="/SubBagianKUL-Adm" element={<SubBagianKUL />} />
        <Route path="/SubBagianPDI-Adm" element={<SubBagianPDI />} />
        <Route path="/SubBagianTPPPH-Adm" element={<SubBagianTPPPH />} />
        <Route path="/Sekretaris-Adm" element={<Sekretaris />} />

        {/* Operator */}
        <Route path="/Login-Op" element={<Login_Op />} />
        <Route path="/Dashboard-Op" element={<Dashboard_Op />} />
        <Route path="/DivisiHP-Op" element={<DivisiHP_Op />} />
        <Route path="/DivisiKURL-Op" element={<DivisiKURL_Op />} />
        <Route path="/DivisiPDI-Op" element={<DivisiPDI_Op />} />
        <Route path="/DivisiSPPP_SDM-Op" element={<DivisiSPPP_SDM_Op />} />
        <Route path="/DivisiTP-Op" element={<DivisiTP_Op />} />
        <Route path="/SubBagianHSDM-Op" element={<SubBagianHSDM_Op />} />
        <Route path="/SubBagianKUL-Op" element={<SubBagianKUL_Op />} />
        <Route path="/SubBagianPDI-Op" element={<SubBagianPDI_Op />} />
        <Route path="/SubBagianTPPPH-Op" element={<SubBagianTPPPH_Op />} />
        <Route path="/Sekretaris-Op" element={<Sekretaris_Op />} />
      </Routes>
    </Router>
  );
}

export default App;
