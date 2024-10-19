import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/login/Login'
import Store from './Store/store';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Layout from './components/layout/Layout';
import RoleLayout from './components/layout/roles/Layout';
import RoleDetails from './components/dashboard/RoleDetails/RoleDetails';
import Home from './pages/dashboards/Admin/Home/Home';
import Notifications from './pages/dashboards/Admin/notifications/Notifications';
import Messages from './pages/dashboards/Admin/messages/Messages';
import Staff from './pages/dashboards/Admin/Staff/Staff';
import Students from './pages/dashboards/Admin/Students/Students';
import Settings from './pages/dashboards/Admin/settings/Settings';
import Roles from './pages/dashboards/Admin/Roles/Roles';
import Admin from './pages/dashboards/Admin/Admin/Admin';
import RouterConfig from './routes/RouterConfig';



function App() {

  return (
    <>
      <Store>
        <Router>
          <RouterConfig />
        </Router>
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </Store>
      
    </>
  )
}

export default App
