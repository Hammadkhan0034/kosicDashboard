import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Table } from 'react-bootstrap';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
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
        setLoading(false);
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


{/* 
        <div className="row" style={{marginBottom: "20px"}}>
                <div className="ms-3 align-iterm-center d-flex justify-content-between">
                <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
                <Link className="btn btn-secondary me-4" to="/assets"><i className="fa-solid fa-plus"></i> Create Assets</Link>
                
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Today's Money</p>
                        <h4 className="mb-0">$53k</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">weekend</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+55% </span>than last week</p>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Today's Users</p>
                        <h4 className="mb-0">2300</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">person</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+3% </span>than last month</p>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Ads Views</p>
                        <h4 className="mb-0">3,462</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">leaderboard</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-danger font-weight-bolder">-2% </span>than yesterday</p>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Sales</p>
                        <h4 className="mb-0">$103,430</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">weekend</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+5% </span>than yesterday</p>
                    </div>
                </div>
                </div>
            </div>
 */}


          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="border-radius-lg pt-4 pb-3" style={{ background: 'Teal' }}>
                    <h6 className="text-white text-capitalize ps-3">All Devices List</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2 mt-4">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div className="table-responsive p-0">
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Device_Id Details</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">MAC Address</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">IP Address</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client Version</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Playlist</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {devices.map((device, index) => (
                            <tr key={device.id}>
                              <td>
                                <Link
                                  to={`/device/${device.id}`}
                                  style={{ textDecoration: "underline", color: "teal" }}
                                >
                                  {device.id}
                                </Link>
                              </td>
                              <td>{device.name}</td>
                              <td>{device.mac_address || 'N/A'}</td>
                              <td>{device.ip_address || 'N/A'}</td>

                              <td>{device.client_version || 'N/A'}</td>


                              <td>{device.playlists.length > 0 ? device.playlists.join(', ') : 'No Playlists'}</td>
                              <td>
                                <Link to={`/single-device/${device.id}`}
                                  style={{ textDecoration: "underline", color: "teal" }}>
                                  Details  </Link></td>
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

