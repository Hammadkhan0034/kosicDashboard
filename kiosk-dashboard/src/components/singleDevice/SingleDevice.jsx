import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { Table } from "react-bootstrap";
import api from "../services/api"; // Adjust the path if necessary

const SingleDevice = () => {
  const { deviceId } = useParams(); // Now extracting deviceID from route params
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await api.get(`/api/devices/${deviceId}`); // Fetching device using deviceID
        setDeviceData(response.data); // Save the full response
      } catch (error) {
        console.error("Failed to fetch device:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevice();
  }, [deviceId]);

  if (loading) return <div>Loading...</div>;
  if (!deviceData) return <div>Device not found</div>;

  const { device_data, playlist_data, playlist_subtype_data } = deviceData;

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
                  <div className="border-radius-lg pt-4 pb-3" style={{ background: "Teal" }}>
                    <h6 className="text-white text-capitalize ps-3">Device Details</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  {/* Device Data Table */}
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{device_data.name || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Device ID</td> 
                        <td>{device_data.device_id || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>IP Address</td>
                        <td>{device_data.ip_address || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Client Version</td>
                        <td>{device_data.client_version || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Playlists</td>
                        <td>
                          {device_data.playlists.length > 0
                            ? device_data.playlists.join(", ")
                            : "No Playlists"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* Playlist Data Table */}
                  <h6 className="text-capitalize ps-3 mt-4">Playlist Data</h6>
                  {playlist_data.length > 0 ? (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Playlist Name</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playlist_data.map((playlist, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{playlist.name || "N/A"}</td>
                            <td>{playlist.details || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No Playlist Data Available</p>
                  )}

                  {/* Playlist Subtype Data Table */}
                  <h6 className="text-capitalize ps-3 mt-4">Playlist Subtype Data</h6>
                  {playlist_subtype_data.length > 0 ? (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Playlist</th>
                          <th>Type</th>
                          <th>Subtype</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playlist_subtype_data.map((subtype, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{subtype.playlist || "N/A"}</td>
                            <td>{subtype.type || "N/A"}</td>
                            <td>{subtype.sub_type || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No Playlist Subtype Data Available</p>
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

export default SingleDevice;




































































// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
// import Footer from "../../components/Footer";
// import { Table } from "react-bootstrap";
// import api from "../services/api"; // Adjust the path if necessary

// const SingleDevice = () => {
//   const { macAddress } = useParams(); // Extract macAddress from route params
//   const [deviceData, setDeviceData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDevice = async () => {
//       try {
//         const response = await api.get(`/api/devices/${macAddress}`);
//         setDeviceData(response.data); // Save the full response
//       } catch (error) {
//         console.error("Failed to fetch device:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDevice();
//   }, [macAddress]);

//   if (loading) return <div>Loading...</div>;
//   if (!deviceData) return <div>Device not found</div>;

//   const { device_data, playlist_data, playlist_subtype_data } = deviceData;

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
//                   <div className="border-radius-lg pt-4 pb-3" style={{ background: "Teal" }}>
//                     <h6 className="text-white text-capitalize ps-3">Device Details</h6>
//                   </div>
//                 </div>
//                 <div className="card-body px-0 pb-2">
//                   {/* Device Data Table */}
//                   <Table striped bordered hover responsive>
//                     <thead>
//                       <tr>
//                         <th>Field</th>
//                         <th>Value</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Name</td>
//                         <td>{device_data.name || "N/A"}</td>
//                       </tr>
//                       <tr>
//                         <td>MAC Address</td>
//                         <td>{device_data.mac_address || "N/A"}</td>
//                       </tr>
//                       <tr>
//                         <td>IP Address</td>
//                         <td>{device_data.ip_address || "N/A"}</td>
//                       </tr>
//                       <tr>
//                         <td>Client Version</td>
//                         <td>{device_data.client_version || "N/A"}</td>
//                       </tr>
//                       <tr>
//                         <td>Playlists</td>
//                         <td>
//                           {device_data.playlists.length > 0
//                             ? device_data.playlists.join(", ")
//                             : "No Playlists"}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </Table>

//                   {/* Playlist Data Table */}
//                   <h6 className="text-capitalize ps-3 mt-4">Playlist Data</h6>
//                   {playlist_data.length > 0 ? (
//                     <Table striped bordered hover responsive>
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Playlist Name</th>
//                           <th>Details</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {playlist_data.map((playlist, index) => (
//                           <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{playlist.name || "N/A"}</td>
//                             <td>{playlist.details || "N/A"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <p>No Playlist Data Available</p>
//                   )}

//                   {/* Playlist Subtype Data Table */}
//                   <h6 className="text-capitalize ps-3 mt-4">Playlist Subtype Data</h6>
// {playlist_subtype_data.length > 0 ? (
//   <Table striped bordered hover responsive>
//     <thead>
//       <tr>
//         <th>#</th>
//         <th>Playlist</th>
//         <th>Type</th>
//         <th>Subtype</th>
//       </tr>
//     </thead>
//     <tbody>
//       {playlist_subtype_data.map((subtype, index) => (
//         <tr key={index}>
//           <td>{index + 1}</td>
//           <td>{subtype.playlist || "N/A"}</td>
//           <td>{subtype.type || "N/A"}</td>
//           <td>{subtype.sub_type || "N/A"}</td>
//         </tr>
//       ))}
//     </tbody>
//   </Table>
// ) : (
//   <p>No Playlist Subtype Data Available</p>
// )}

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

// export default SingleDevice;

