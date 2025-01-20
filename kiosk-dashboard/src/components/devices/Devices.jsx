import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Table } from 'react-bootstrap';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "../Spinner";
// import { ArrowRight } from 'react-bootstrap-icons';

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
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="border-radius-lg pt-4 pb-3" style={{ background: 'Teal' }}>
                    <h6 className="text-white text-capitalize ps-3">All Devices List</h6>
                    {/* <ArrowRight color="royalblue" size={96} /> */}
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

