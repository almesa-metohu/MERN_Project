import React from "react";
import './sidebar.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";

const Sidebar = () => {

    const navigate = useNavigate()
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const signOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: 'same-origin' })
            .then(() => {
                console.log('logging out')
                localStorage.removeItem('userId');
                navigate('/')
            })
            .catch(err => console.log(err.data))
    }

    return (
        <div className="sidebar-container">
            <div className="d-flex flex-column  p-3 sidebar-content">
                <ul className="nav nav-pills flex-column mb-auto">
                    <h6 style={{ color: '#1D5C63', fontSize: '14px' }}>MAIN</h6>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "dashboard" ? "active" : ""
                                }`}
                            onClick={() => {handleButtonClick("dashboard")
                                            navigate('admin/dashboard')}}
                        >
                            &nbsp;&nbsp;&nbsp;Dashboard&nbsp;&nbsp;&nbsp;
                        </button>
                    </li>
                    <br />
                    <h6 style={{ color: '#1D5C63', fontSize: '14px' }}>LISTS</h6>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "users" ? "active" : ""
                                }`}
                            onClick={() => {handleButtonClick("users")
                            navigate('admin/users')
                        }}
                        >
                            &nbsp;&nbsp;&nbsp;Users&nbsp;&nbsp;&nbsp;
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "hotels" ? "active" : ""
                                }`}
                            onClick={() => {handleButtonClick("hotels")
                            navigate('admin/hotels')}}
                        >
                            &nbsp;&nbsp;&nbsp;Hotels&nbsp;&nbsp;&nbsp;
                        </button>
                    </li>
                    <br />
                    <h6 style={{ color: '#1D5C63', fontSize: '14px' }}>SERVICE</h6>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "requests" ? "active" : ""
                                }`}
                            onClick={() => {handleButtonClick("requests")
                            navigate('admin/requests')}}
                        >
                            &nbsp;&nbsp;&nbsp;Requests&nbsp;&nbsp;&nbsp;
                        </button>
                    </li>
                </ul>
                <hr />
                <button className="btn" onClick={signOut}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
