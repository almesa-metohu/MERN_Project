import React from "react";
import Sidebar from "../../components/adminSidebar/Sidebar";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './admin.css'
import Dashboard from "../../components/dashboard/Dashboard";
import Users from "../../components/users/Users";
import Hotels from "../../components/hotels/Hotels";

const Admin = () => {



    return (
        <div>
            <div className="d-flex wraping-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="components-container">
                    <Routes>
                        <Route path="admin/dashboard" element={<Dashboard/>}/>
                        <Route path="admin/users" element={<Users />} />
                        <Route path="admin/hotels" element={<Hotels />} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}


export default Admin;