import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Modal, Button, Table } from "react-bootstrap";
import api from "../services/api";
import { useParams } from "react-router-dom";

const Device = () => {
    const { deviceID } = useParams(); // Get device ID from route params
    const [playlists, setPlaylists] = useState([]);
    const [deviceData, setDeviceData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);
    const [loadingDevice, setLoadingDevice] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all playlists on component mount
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await api.get("/all_playlists_with_assets/");
                setPlaylists(response.data || []);
            } catch (err) {
                console.error("Error fetching playlists:", err);
                setError("Failed to fetch playlists.");
            } finally {
                setLoadingPlaylists(false);
            }
        };

        fetchPlaylists();
    }, []);

    // Fetch device data
    const fetchDeviceData = async () => {
        setLoadingDevice(true);
        try {
            const response = await api.get(`/api/devices/${deviceID}`);

            console.log("Fetch Device Data", response)
            setDeviceData(response.data);
        } catch (err) {
            console.error("Error fetching device data:", err);
            setError("Failed to fetch device data.");
        } finally {
            setLoadingDevice(false);
        }
    };

    useEffect(() => {
        fetchDeviceData();
    }, [deviceID]);

    // Handle adding playlist to device
    const handleAddPlaylist = async () => {
        if (!selectedPlaylist) {
            alert("Please select a playlist.");
            return;
        }

        try {
            await api.post(`/api/devices/${deviceID}/add-playlist/`, {
                playlist_id: selectedPlaylist.id,
                type: "button1", 
            });
            alert("Playlist added successfully!");
            setShowModal(false);
            // Fetch updated device data
            fetchDeviceData();
        } catch (err) {
            console.error("Error adding playlist to device:", err);
            alert("Failed to add playlist to device.");
        }
    };

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
                                    <div className="border-radius-lg pt-4 pb-3" style={{ background: '#3ab371' }}>
                                        <h6 className="text-white text-capitalize ps-3">Device Playlists</h6>
                                    </div>
                                </div>

                                <div className="card-body px-0 pb-2" style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ background: 'teal', color: '#fff', borderRadius: '5px' }}
                                        onClick={() => setShowModal(true)}
                                    >
                                        Add Playlist to Device
                                    </button>
                                </div>

                                {/* <div className="text-center my-4">
                  {loadingDevice ? (
                    <p>Loading device data...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : deviceData ? (
                    <div className="table-responsive p-0">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Playlist ID</th>
                            <th>Playlist Name</th>
                            <th>Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deviceData.playlists.map((playlist, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{playlist.id}</td>
                              <td>{playlist.name}</td>
                              <td>{playlist.type || "N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <p>No playlists found for this device.</p>
                  )}
                </div> */}
                                <div className="text-center my-4">
                                    {loadingDevice ? (
                                        <p>Loading device data...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : deviceData && deviceData.playlists ? (
                                        <div className="table-responsive p-0">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Playlist ID</th>
                                                        <th>Playlist Name</th>
                                                        <th>Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deviceData.playlists.map((playlist, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{playlist.id}</td>
                                                            <td>{playlist.name}</td>
                                                            <td>{playlist.type || "N/A"}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <p>No playlists found for this device.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Modal for Selecting Playlist */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingPlaylists ? (
                        <p>Loading playlists...</p>
                    ) : playlists.length > 0 ? (
                        <ul className="list-group">
                            {playlists.map((playlist) => (
                                <li
                                    key={playlist.id}
                                    className={`list-group-item ${selectedPlaylist?.id === playlist.id ? "active" : ""}`}
                                    onClick={() => setSelectedPlaylist(playlist)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {playlist.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No playlists available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddPlaylist}>
                        Add Playlist
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Device;





































































// import React, { useEffect, useState } from "react";
// import Footer from "../Footer";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";
// import { Modal, Button } from "react-bootstrap";
// import api from "../services/api";
// import { useParams } from "react-router-dom";

// const Device = () => {
//   const { deviceID } = useParams();

//   console.log("Device Id", deviceID)
//   const [playlists, setPlaylists] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all playlists on component mount
//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const response = await api.get("/all_playlists_with_assets/");
//         setPlaylists(response.data || []);
//       } catch (err) {
//         console.error("Error fetching playlists:", err);
//         setError("Failed to fetch playlists.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlaylists();
//   }, []);

//   // Handle adding playlist to device
//   const handleAddPlaylist = async () => {
//     if (!selectedPlaylist) {
//       alert("Please select a playlist.");
//       return;
//     }

//     try {
//       const response = await api.post(`/api/devices/${deviceID}/add-playlist/`, {
//         playlist_id: selectedPlaylist.id,
//         type: "button1", // Adjust type as needed
//       });
//       alert("Playlist added successfully!");
//       setShowModal(false);
//     } catch (err) {
//       console.error("Error adding playlist to device:", err);
//       alert("Failed to add playlist to device.");
//     }
//   };

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
//                   <div className="border-radius-lg pt-4 pb-3" style={{ background: '#3ab371' }}>
//                     <h6 className="text-white text-capitalize ps-3">Playlist Assets</h6>
//                   </div>
//                 </div>

//                 <div className="card-body px-0 pb-2" style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>
//                   <button
//                     className="btn btn-secondary"
//                     style={{ background: 'teal', color: '#fff', borderRadius: '5px' }}
//                     onClick={() => setShowModal(true)}
//                   >
//                     Add Playlist to Device
//                   </button>
//                 </div>

//                 <div className="text-center my-4">
//                   {loading ? (
//                     <p>Loading playlists...</p>
//                   ) : error ? (
//                     <p>{error}</p>
//                   ) : (
//                     <div className="table-responsive p-0">
//                       <table className="table align-items-center mb-0">
//                         <thead>
//                           <tr>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Asset_id</th>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order</th>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thumbnail</th>
//                           </tr>
//                         </thead>
//                       </table>
//                       <div className="text-center my-4">
//                         <p>No assets found for this playlist.</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />

//       {/* Modal for Selecting Playlist */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Playlist</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             {playlists.length > 0 ? (
//               <ul className="list-group">
//                 {playlists.map((playlist) => (
//                   <li
//                     key={playlist.id}
//                     className={`list-group-item ${selectedPlaylist?.id === playlist.id ? "active" : ""}`}
//                     onClick={() => setSelectedPlaylist(playlist)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {playlist.name}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No playlists available.</p>
//             )}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleAddPlaylist}>
//             Add Playlist
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Device;
