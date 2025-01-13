import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../src/components/services/api';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = async () => {
    try {
      const response = await api.get('/user_info'); // Fetch user info
      setUserInfo(response.data);
      setShowModal(true); // Show the modal after data is fetched
    } catch (error) {
      console.error('Error fetching user information:', error);
      alert('Failed to fetch user information.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('authToken'); // Clear the auth token on logout
    navigate('/');
  };

  return (
    <>
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true"
      >
        <div className="container-fluid py-1 px-3">
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              <div className="input-group input-group-outline">
                <label className="form-label">Type here...</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <ul className="navbar-nav d-flex align-items-center justify-content-end">
              <li className="nav-item d-flex align-items-center position-relative">
                <button
                  className="nav-link text-body font-weight-bold px-0 bg-transparent border-0"
                  onClick={toggleDropdown}
                >
                  <i className="material-symbols-rounded">account_circle</i>
                </button>

                {showDropdown && (
                  <div className="dropdown-menu show p-2 position-absolute" style={{ top: '100%', right: 0 }}>
                    <button className="dropdown-item" onClick={openModal}>
                      User Profile
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal for User Info */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Profile</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {userInfo ? (
                  <div>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Group:</strong> {userInfo.group.join(', ')}</p>
                  </div>
                ) : (
                  <p>Loading user information...</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

















































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../src/components/services/api';

// const Navbar = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const openModal = async () => {
//     try {
//       const response = await api.get('/user_info'); // Fetch user info
//       setUserInfo(response.data);
//       setShowModal(true); // Show the modal after data is fetched
//     } catch (error) {
//       console.error('Error fetching user information:', error);
//       alert('Failed to fetch user information.');
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleLogout = () => {
//     console.log('Logout clicked');
//     localStorage.removeItem('authToken'); // Clear the auth token on logout
//     // Add any additional logout logic here
//   };

//   return (
//     <>
//       <nav
//         className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl"
//         id="navbarBlur"
//         data-scroll="true"
//       >
//         <div className="container-fluid py-1 px-3">
//           <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
//             <div className="ms-md-auto pe-md-3 d-flex align-items-center">
//               <div className="input-group input-group-outline">
//                 <label className="form-label">Type here...</label>
//                 <input type="text" className="form-control" />
//               </div>
//             </div>
//             <ul className="navbar-nav d-flex align-items-center justify-content-end">
//               <li className="nav-item d-flex align-items-center position-relative">
//                 <button
//                   className="nav-link text-body font-weight-bold px-0 bg-transparent border-0"
//                   onClick={toggleDropdown}
//                 >
//                   <i className="material-symbols-rounded">account_circle</i>
//                 </button>

//                 {showDropdown && (
//                   <div className="dropdown-menu show p-2 position-absolute" style={{ top: '100%', right: 0 }}>
//                     <button className="dropdown-item" onClick={openModal}>
//                       User Profile
//                     </button>
//                     <button className="dropdown-item" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Modal for User Info */}
//       {showModal && (
//         <div
//           className="modal fade show"
//           style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">User Profile</h5>
//                 <button type="button" className="btn-close" onClick={closeModal}></button>
//               </div>
//               <div className="modal-body">
//                 {userInfo ? (
//                   <div>
//                     <p><strong>Name:</strong> {userInfo.name}</p>
//                     <p><strong>Email:</strong> {userInfo.email}</p>
//                     {/* Add more user info fields if available */}
//                   </div>
//                 ) : (
//                   <p>Loading user information...</p>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={closeModal}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

