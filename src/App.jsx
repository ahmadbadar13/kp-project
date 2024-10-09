import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Halaman Login
import Login from './pages/Login';

// Halaman Register
import Register from './pages/Register';

// Halaman Admin
import Dashboard_Adm from './pages/Admin/Dashboard-Adm';
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

// Halaman Operator
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

// Komponen untuk memastikan akses sesuai dengan peran
const PrivateRoute = ({ element, role }) => {
  const userRole = sessionStorage.getItem('role');
  if (userRole === role) {
    return element;
  }
  return <Navigate to="/Login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />

        {/* Login */}
        <Route path="/Login" element={<Login />} />

        {/* Register */}
        <Route path="/Register" element={<Register />} />

        {/* Admin */}
        <Route path="/Dashboard-Adm" element={<PrivateRoute element={<Dashboard_Adm />} role="admin" />} />
        <Route path="/DivisiHP-Adm" element={<PrivateRoute element={<DivisiHP />} role="admin" />} />
        <Route path="/DivisiKURL-Adm" element={<PrivateRoute element={<DivisiKURL />} role="admin" />} />
        <Route path="/DivisiPDI-Adm" element={<PrivateRoute element={<DivisiPDI />} role="admin" />} />
        <Route path="/DivisiSPPP_SDM-Adm" element={<PrivateRoute element={<DivisiSPPP_SDM />} role="admin" />} />
        <Route path="/DivisiTP-Adm" element={<PrivateRoute element={<DivisiTP />} role="admin" />} />
        <Route path="/SubBagianHSDM-Adm" element={<PrivateRoute element={<SubBagianHSDM />} role="admin" />} />
        <Route path="/SubBagianKUL-Adm" element={<PrivateRoute element={<SubBagianKUL />} role="admin" />} />
        <Route path="/SubBagianPDI-Adm" element={<PrivateRoute element={<SubBagianPDI />} role="admin" />} />
        <Route path="/SubBagianTPPPH-Adm" element={<PrivateRoute element={<SubBagianTPPPH />} role="admin" />} />
        <Route path="/Sekretaris-Adm" element={<PrivateRoute element={<Sekretaris />} role="admin" />} />

        {/* Operator */}
        <Route path="/Dashboard-Op" element={<PrivateRoute element={<Dashboard_Op />} role="operator" />} />
        <Route path="/DivisiHP-Op" element={<PrivateRoute element={<DivisiHP_Op />} role="operator" />} />
        <Route path="/DivisiKURL-Op" element={<PrivateRoute element={<DivisiKURL_Op />} role="operator" />} />
        <Route path="/DivisiPDI-Op" element={<PrivateRoute element={<DivisiPDI_Op />} role="operator" />} />
        <Route path="/DivisiSPPP_SDM-Op" element={<PrivateRoute element={<DivisiSPPP_SDM_Op />} role="operator" />} />
        <Route path="/DivisiTP-Op" element={<PrivateRoute element={<DivisiTP_Op />} role="operator" />} />
        <Route path="/SubBagianHSDM-Op" element={<PrivateRoute element={<SubBagianHSDM_Op />} role="operator" />} />
        <Route path="/SubBagianKUL-Op" element={<PrivateRoute element={<SubBagianKUL_Op />} role="operator" />} />
        <Route path="/SubBagianPDI-Op" element={<PrivateRoute element={<SubBagianPDI_Op />} role="operator" />} />
        <Route path="/SubBagianTPPPH-Op" element={<PrivateRoute element={<SubBagianTPPPH_Op />} role="operator" />} />
        <Route path="/Sekretaris-Op" element={<PrivateRoute element={<Sekretaris_Op />} role="operator" />} />
      </Routes>
    </Router>
  );
}

export default App;
