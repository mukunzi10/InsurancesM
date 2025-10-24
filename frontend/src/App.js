import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import ClientRegister from "./pages/ClientRegister";
import ClientDashboard from "./pages/ClientDashboard";
import ClientServices from "./pages/ClientServices";
import ClientComplaints from "./pages/ClientComplaints";
import ClientFeedback from "./pages/ClientFeedback";

import Dashboard from "./pages/Dashboard";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import Reports from "./pages/Reports";
import LoginPage from "./pages/LoginPage";
import "./App.css"
import WBSICProjectDashboard from "./pages/WBSICProjectDashboard";

function App() {
    return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<ClientDashboard />} />
        <Route path="/register" element={<ClientRegister />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/services" element={<ClientServices />} />
          <Route path="/complaints" element={<ClientComplaints />} />
          <Route path="/feedback" element={<ClientFeedback />} />
          
        
        {/* Placeholder routes - create these components next */}
        {/* <Route path="/complaints" element={<div className="p-8">Complaints Page - Coming Soon</div>} /> */}
        {/* <Route path="/feedback" element={<div className="p-8">Feedback Page - Coming Soon</div>} /> */}
        
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
