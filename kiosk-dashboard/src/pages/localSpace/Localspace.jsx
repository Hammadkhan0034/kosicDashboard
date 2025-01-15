import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import api from '../../components/services/api'

function Localspace() {
  const { playlistId } = useParams();
  console.log("Playlist Id is", playlistId)
  const [assets, setAssets] = useState([]); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get(`/playlists/${playlistId}/assets`); 
        setAssets(response.data.assets); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setLoading(false);
      }
    };

    fetchAssets();
  }, [playlistId]);

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">Playlist Assets</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  {loading ? (
                    <div className="text-center my-4">
                      <p>Loading assets...</p>
                    </div>
                  ) : (
                    <>
                      {assets.length > 0 ? (
                        <div className="table-responsive p-0">
                          <table className="table align-items-center mb-0">
                            <thead>
                              <tr>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Description</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {assets.map((asset, index) => (
                                <tr key={asset.id}>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">{asset.name}</p>
                                  </td>
                                  <td>
                                    <p className="text-xs text-secondary mb-0">{asset.description}</p>
                                  </td>
                                  <td className="align-middle">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => alert(`Delete asset ${asset.id}`)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center my-4">
                          <p>No assets found for this playlist.</p>
                        </div>
                      )}
                    </>
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
}

export default Localspace;

















































// import React from 'react'
// import Navbar from '../../components/Navbar';
// import Sidebar from '../../components/Sidebar';
// import Footer from '../../components/Footer';
// import { Link } from 'react-router-dom';
// function Localspace() {
//   return (
//     <>
//         <Sidebar/>
//         <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
//         <Navbar/>
//             <div className="container-fluid py-2">
//                 <div className="row">
//                     <div className="col-12">
//                     <div className="card my-4">
//                         <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
//                             <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
//                                 <h6 className="text-white text-capitalize ps-3">Playlist Assets</h6>
//                             </div>
//                         </div>
//                         <div className="card-body px-0 pb-2">
//                             <div className="text-end m-4">
//                                     <Link className="btn btn-secondary" to="/add-local-space">Add Play List</Link>
//                             </div>
//                             <div className="table-responsive p-0">
//                                     <table className="table align-items-center mb-0">
//                                         <thead>
//                                             <tr>
//                                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
//                                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
//                                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Decription</th>
//                                             <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total Assets</th>
//                                             <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
//                                             <th className="text-secondary opacity-7"></th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td>
//                                                     <p className="text-xs font-weight-bold mb-0">1</p>
//                                                 </td>
//                                                 <td>
//                                                     <p className="text-xs font-weight-bold mb-0">Manager</p>
//                                                 </td>
//                                                 <td>
//                                                     <p className="text-xs text-secondary mb-0">Organization</p>
//                                                 </td>
//                                                 <td className="align-middle text-center text-sm">
//                                                     <p className="text-xs text-secondary mb-0">3</p>
//                                                 </td>
//                                                 <td className="align-middle">
//                                                     <Link to="/edit-local-space" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
//                                                         <i class="fa-solid fa-pen-to-square fs-5 me-3"></i>
//                                                     </Link>
//                                                     <Link href="" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
//                                                         <i class="fa-solid fa-trash fs-5 me-3 text-danger"></i>                                                
//                                                     </Link>
//                                                     <Link href="" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
//                                                         <i class="fa-solid fa-laptop-file  fs-5 me-3 text-success"></i>                                               
//                                                     </Link>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//         <Footer/>
//     </>
//   );
// }

// export default Localspace
