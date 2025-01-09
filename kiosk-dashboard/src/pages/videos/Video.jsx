
import React, { useEffect, useState } from 'react';
import { getAllPlaylists, addPlaylist, deletePlaylist, } from '../../components/services/api';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Video() {

  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    type: 'host',
    description: ''
  });


  // Fetch ALL Playlist
  const fetchPlaylists = async () => {
    try {
      const data = await getAllPlaylists();
      setLoading(true);
      setPlaylists(data);
    } catch (error) {
      console.error('Failed to fetch playlists:', error.message);
      toast.error('Failed to fetch playlists!');
    } finally {
      setLoading(false);
    }
  };

  // ADD NEW PLAY LIST
  const handleAddPlaylist = async () => {
    try {
      await addPlaylist(newPlaylist);
      setShowModal(false);
      setNewPlaylist({ name: '', type: '', description: '' });
      fetchPlaylists();
      toast.success('Playlist added successfully!');
    } catch (error) {
      console.error('Failed to add playlist:', error.message);
      toast.error('Failed to add playlist!');
    }
  };


  {/*--tables with Asset start-- */ }
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleAssetClick = (asset) => {
    console.log('Asset clicked:', asset);
    setSelectedAsset(asset);
    setShowAssetModal(true);
  };

  const handleCloseModal = () => {
    setShowAssetModal(false);
    setSelectedAsset(null);
  };
  {/*--tables with Asset End-- */ }


  useEffect(() => {
    fetchPlaylists();
  }, []);


  // Delete Playlist
  const handleDeletePlaylist = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
      toast.success('Playlist deleted successfully!');
    } catch (error) {
      toast.error('Error deleting playlist!');
    }
  }

  const handleEditClick = async() =>{

  }



  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2" style={{ background: 'teal' }}>
                  <h6 className="text-white ps-5" style={{ fontSize: '24px' }}>Playlist Details</h6>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="text-end m-4">
                    <button
                      className="btn btn-secondary"
                      style={{ background: 'teal', color: '#fff', borderRadius: '5px' }}
                      onClick={() => setShowModal(true)}>
                      Add New Playlist
                    </button>
                  </div>

                  {/* table Start */}
                  {loading && <Spinner />}
                  {!loading && (
                    <div>
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0" style={{ tableLayout: 'fixed', width: '100%' }}>
                          <thead>
                            <tr>
                              <th style={{ width: '5%' }}>No</th>
                              <th style={{ width: '20%' }}>Name</th>
                              <th style={{ width: '20%' }}>Description</th>
                              <th style={{ width: '15%' }} className="text-center">Type</th>
                              <th style={{ width: '15%' }} className="text-center">Edit</th>
                              <th style={{ width: '15%' }} className="text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(playlists || []).map((playlist, index) => (
                              <tr key={playlist.id}>
                                <td>{index + 1}</td>
                                <td>{playlist.name}</td>
                                {/* <td> */}

                                {/* {playlist.asset && playlist.asset.length > 0
                                    ? playlist.asset.map((asset, assetIndex) => (
                                      <span
                                        key={assetIndex}
                                        onClick={() => handleAssetClick(asset)}
                                        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                                        {asset.asset_id}
                                      </span>
                                    ))
                                    : 'No Assets Available'}
                                </td> */}

                                <td className="text-center">{playlist.description}</td>
                                <td className="text-center">{playlist.type}</td>


                                <td>
                                  <button style={{ background: "teal", border: "none", borderRadius: "5px", padding: "px" }}
                                  onClick={() => handleEditClick()}>
                                    <i className="fa-solid fa-edit" style={{ color: "#fff" }}></i>
                                  </button>
                                </td>
                                <td className="text-center">
                                  <button
                                    onClick={() => handleDeletePlaylist(playlist.id)}
                                    className="btn btn-sm btn-danger"
                                    style={{
                                      background: 'red',
                                      border: 'none',
                                      borderRadius: '5px',
                                      padding: '5px',
                                    }}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* table End with Table Modal */}

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Playlist Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5>Add New Playlist</h5>
              <input
                type="text"
                placeholder="Playlist Name"
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Playlist Type"
                value={newPlaylist.type}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, type: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newPlaylist.description}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={handleAddPlaylist} style={{ background: 'teal', color: '#fff' }}>Add</button>
                <button onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {/* Close Playlist Modal */}
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Video;