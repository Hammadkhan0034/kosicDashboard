
import React from 'react'
import { Link ,Links,useLocation } from 'react-router-dom';
import vedioImg from "../components/images/vedios.png"
import deviceImg from "../components/images/devices.png"
import dashboardImg from "../components/images/dashboard.png"

function Sidebar() {
    const location = useLocation();

    // Function to determine if the route is active
    const isActive = (path) => location.pathname === path;
  return (
    <>
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2"
            id="sidenav-main">
            <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <Link className="navbar-brand px-4 py-3 m-0" to="/">
                {/* <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img" width="26" height="26" alt="main_logo"/> */}
                <span className="ms-1 text-sm text-dark">Kiosk</span>
            </Link>
            </div>
            <hr className="horizontal dark mt-0 mb-2"/>
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link
                        className={`nav-link ${isActive('/') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                        to="/"
                    > 
                        <i > <img src={dashboardImg} alt=""  style={{width: "25px", height: "25px",}}/></i>
                        <span className="nav-link-text ms-1">Dashboard</span>
                    </Link>
                    </li>

                    {/* // main-device list */}
                    {/* <li className="nav-item">
                    <Link
                        className={`nav-link ${isActive('/main') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                        to="/main"
                    >
                        <i className="material-symbols-rounded opacity-5">table_view</i>
                        <span className="nav-link-text ms-1">Main Page</span>
                    </Link>
                    </li> */}

                    <li className="nav-item">
                    <Link
                        className={`nav-link ${isActive('/all-devices') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                        to="/all-devices"
                    >
                        <i > <img src={deviceImg} alt=""  style={{width: "25px", height: "25px", color: "teal"}}/></i>
                        <span className="nav-link-text ms-1">Devices</span>
                    </Link>
                    </li>


                    <li className="nav-item">
                    <Link
                        className={`nav-link ${isActive('/video') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                        to="/video"
                    >
                        <i > <img src={vedioImg} alt=""  style={{width: "25px", height: "25px", color: "teal"}}/></i>
                        <span className="nav-link-text ms-1">Video</span>
                    </Link>
                    </li>
                   
                    <li className="nav-item">
                    <Link
                        className={`nav-link ${isActive('/store-special') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                        to="/store-special"
                    >
                    <i className="material-symbols-rounded opacity-5">view_in_ar</i>                        
                    <span className="nav-link-text ms-1">Store Specials</span>
                    </Link>
                    </li>

                    <li className="nav-item">
                    <Link
                        className={`nav-link ${isActive('/local-space') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                        to="/local-space"
                    >
                        <i className="material-symbols-rounded opacity-5">view_in_ar</i>
                        <span className="nav-link-text ms-1">Local Specials</span>
                    </Link>
                    </li>

                    {/* <li>
                        <Links to= "/all-devices">
                        Devices
                        </Links>
                        
                    </li> */}

                </ul>
            </div>
        </aside>
    </>
  )
}

export default Sidebar
