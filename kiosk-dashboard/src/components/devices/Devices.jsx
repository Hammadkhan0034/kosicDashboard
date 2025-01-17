import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Table } from 'react-bootstrap'; 
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Spinner from "../Spinner";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get('/api/devices/list');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch or error
      }
    };

    fetchDevices();
  }, []);

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="border-radius-lg pt-4 pb-3" style={{ background: 'Teal' }}>
                    <h6 className="text-white text-capitalize ps-3">All Devices List</h6>
                  </div>
                </div>

                <div className="card-body px-0 pb-2" style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>
                  <button
                    className="btn btn-secondary"
                    style={{ background: 'teal', color: '#fff', borderRadius: '5px' }}
                    onClick={() => navigate('/signle-device')}
                  >
                    Get Devices By ID
                  </button>
                </div>

                <div className="card-body px-0 pb-2 mt-4">
                  {loading ? (
                    <Spinner /> // Show spinner while loading
                  ) : (
                    <div className="table-responsive p-0">
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">MAC Address</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">IP Address</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client Version</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Playlist</th>
                          </tr>
                        </thead>
                        <tbody>
                          {devices.map((device, index) => (
                            <tr key={device.id}>
                              <td>{index + 1}</td>
                              <td>{device.name}</td>
                              <td>{device.mac_address}</td>
                              <td>{device.ip_address || 'N/A'}</td>
                              <td>{device.client_version || 'N/A'}</td>
                              <td>{device.playlists.length > 0 ? device.playlists.join(', ') : 'No Playlists'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Devices;


















































// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import Footer from '../../components/Footer';
// import { Table } from 'react-bootstrap'; 
// import api from '../services/api'
// import { useNavigate, Link } from 'react-router-dom';
// import Spinner from "../Spinner.jsx"

// const Devices = () => {
//   const [devices, setDevices] = useState([]); 

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const response = await api.get('/api/devices/list');
//         setDevices(response.data); 
//       } catch (error) {
//         console.error('Error fetching devices:', error);
//       }
//     };

//     fetchDevices();
//   }, []); 

//   return (
//     <>
//       <Sidebar />
//       <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
//         <Navbar />
//         <div className="container-fluid py-2">
//           <div className="row">
//             <div className="col-12">
//               <div className="card my-4">
//                 <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
//                   <div className="border-radius-lg pt-4 pb-3" style={{ background: 'Teal' }}>
//                     <h6 className="text-white text-capitalize ps-3">All Devices List</h6>
//                   </div>
//                 </div>

//                 <div className="card-body px-0 pb-2" style={{ display: "flex", justifyContent: "end", marginRight: "10px"}}>
//                     <button
//                       className="btn btn-secondary"
//                       style={{ background: 'teal', color: '#fff', borderRadius: '5px', }}
//                       onClick = {() => navigate('/signle-device')}>
//                       Get Devices By ID
//                     </button>
//                   </div>

//                 <div className="card-body px-0 pb-2 mt-4">
//                   <div className="table-responsive p-0">
//                     <Table striped bordered hover responsive>
//                       <thead>
//                         <tr>
//                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
//                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
//                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">MAC Address</th>
//                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">IP Address</th>
//                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client Version</th>
//                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Playlist</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                           {devices.map((device, index) => (
//                             <tr key={device.id}>
//                               <td>{index + 1}</td>
//                               <td>{device.name}</td>
//                               {/* <td>
//                                     <Link
//                                   to = {`/single-device/${device.id}`}
//                                       style={{ textDecoration: 'underline', color: 'inherit' }}  
//                                     >
//                                      {device.name}
//                                     </Link>
//                                   </td> */}
//                               <td>{device.mac_address}</td>
//                               <td>{device.ip_address || 'N/A'}</td>
//                               <td>{device.client_version || 'N/A'}</td>
//                               <td>{device.playlists.length > 0 ? device.playlists.join(', ') : 'No Playlists'}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                     </Table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Devices;
