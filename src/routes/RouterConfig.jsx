import React from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import Login from '../pages/login/Login'
import ProtectedRoute from '../components/protected/ProtectedRoute';
import Layout from '../components/layout/Layout';
import RoleLayout from '../components/layout/roles/Layout';
import RoleDetails from '../components/dashboard/RoleDetails/RoleDetails';
import Home from '../pages/dashboards/Admin/Home/Home';
import Notifications from '../pages/dashboards/Admin/notifications/Notifications';
import Messages from '../pages/dashboards/Admin/messages/Messages';
import Staff from '../pages/dashboards/Admin/Staff/Staff';
import Students from '../pages/dashboards/Admin/Students/Students';
import Settings from '../pages/dashboards/Admin/settings/Settings';
import Roles from '../pages/dashboards/Admin/Roles/Roles';
import Admin from '../pages/dashboards/Admin/Admin/Admin';
import useGlobalState from '../Global/useGlobalState';

const RouterConfig = () => {
    const {isAdmin} = useGlobalState();
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/*' element={<ProtectedRoute component={Layout} />}>
            {/* Admin Routes */}
            {
                isAdmin ?
                <>
                    <Route index element={<Navigate to="dashboard/home" />}/>
                    <Route path='dashboard/home' element={<Home />} />
                    <Route  path="notifications" element={<Notifications />}/>
                    <Route  path="roles" element={<RoleLayout />}>
                        <Route index element={<Roles />} />
                        <Route path=":roleName" element={<RoleDetails />} />
                    </Route>
                    <Route  path="messages" element={<Messages />}/>
                    <Route  path="admins" element={<Admin />}/>
                    <Route  path="staffs" element={<Staff />}/>
                    <Route  path="students" element={<Students />}/>
                    <Route  path="settings" element={<Settings />}/>
                </> :
                <>
                    <Route index element={<Navigate to="dashboard/home" />}/>
                    <Route path='dashboard/home' element={<Home />} />
                    <Route  path="notifications" element={<Notifications />}/>
                    <Route  path="messages" element={<Messages />}/>
                    <Route  path="settings" element={<Settings />}/>
                    <Route path='*' element={<Navigate to="/login" />} />

                </>
            }
            {/*  */}
            {/* User Routes */}
        </Route>
        <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default RouterConfig
