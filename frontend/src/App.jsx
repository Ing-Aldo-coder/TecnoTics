import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import SCM from './pages/SCM';
import ERP from './pages/ERP';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crm" element={<CRM />} />
          <Route path="scm" element={<SCM />} />
          <Route path="erp" element={<ERP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
