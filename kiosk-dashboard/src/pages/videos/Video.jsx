
import React, { useEffect, useState } from 'react';
import { getAllPlaylists, addPlaylist, deletePlaylist, updatePlaylist } from '../../components/services/api';
import api from '../../components/services/api'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Video() {

  // Add asset to playlist states start 

  const [assets, setAssets] = useState([]); 
  const [showAddAssetModal, setShowAddAssetModal] = useState(false); 
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // Add asset to playlist states end 


  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    type: '',
    description: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState(null);

  // Fetch all playlists
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

  // Add a new playlist
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

  // Update a playlist
  const handleUpdatePlaylist = async () => {
    try {
      await updatePlaylist(editPlaylist.id, editPlaylist);
      setShowEditModal(false);
      setEditPlaylist(null);
      fetchPlaylists();
      toast.success('Playlist updated successfully!');
    } catch (error) {
      console.error('Failed to update playlist:', error.message);
      toast.error('Failed to update playlist!');
    }
  };

  // Open edit modal with playlist details
  const handleEditClick = (playlist) => {
    setEditPlaylist(playlist);
    setShowEditModal(true);
  };

  // Delete a playlist
  const handleDeletePlaylist = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
      toast.success('Playlist deleted successfully!');
    } catch (error) {
      toast.error('Error deleting playlist!');
    }
  };



  // ADD ASSET TO PLAYLIST
  const fetchAssets = async () => {
    try {
      const response = await api.get('api/asset'); 
      setAssets(response.data);
      console.log("Assets available for selection:", response.data);
    } catch (error) {
      console.error('Failed to fetch assets:', error.message);
      toast.error('Failed to fetch assets!');
    }
  };
  
  const handleAddAssetToPlaylist = async () => {
    if (!selectedPlaylist || !selectedAsset) {
      toast.error('Please select both a playlist and an asset!');
      return;
    }

    try {
      const response = await api.post('/playlist-asset/', {
        playlist: selectedPlaylist,
        asset: selectedAsset,
      });
      console.log("response add asset to playlist is", response);

      // Check if the response is HTML (indicating an error or redirect)
    if (response.data.includes("<html")) {
      console.error("Received HTML instead of JSON:", response.data);
      toast.error('Error adding asset to playlist!');
      return;
    }

     // Assuming a success response is JSON
     console.log('API response:', response.data);
     toast.success('Asset added to playlist successfully!');
     setShowAddAssetModal(false);

      toast.success('Asset added to playlist successfully!');
      setShowAddAssetModal(false);
    } catch (error) {
      console.error('Failed to add asset to playlist:', error.message);
      toast.error('Failed to add asset to playlist!');
    }
  };

  // END ASSET TO PLAYLIST

  useEffect(() => {
    fetchPlaylists();
    fetchAssets();
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
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2" style={{ background: 'teal' }}>
                  <h6 className="text-white ps-5" style={{ fontSize: '24px' }}>Playlist Details</h6>
                </div>
                <div className="card-body px-0 pb-2">


                <div className="m-4" style={{ display: "flex", justifyContent: "space-between" }}>                    <button
                      className="btn btn-secondary"
                      style={{ background: '#8B4513', color: '#fff', borderRadius: '5px' }}
                      onClick={() => setShowAddAssetModal(true)}>
                      Add Asset to Playlist
                    </button>

                    <button
                      className="btn btn-secondary"
                      style={{ background: 'teal', color: '#fff', borderRadius: '5px' }}
                      onClick={() => setShowModal(true)}>
                      Add New Playlist
                    </button>

                  </div>

                  {loading && <Spinner />}
                  {!loading && (
                    <div>
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0" style={{ tableLayout: 'fixed', width: '100%' }}>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th className="text-center">Type</th>
                              <th className="text-center">Edit</th>
                              <th className="text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(playlists || []).map((playlist, index) => (
                              <tr key={playlist.id}>
                                <td>{index + 1}</td>
                                <td>{playlist.name}</td>
                                <td className="text-center">{playlist.description}</td>
                                <td className="text-center">{playlist.type}</td>
                                <td className="text-center">
                                  <button
                                    style={{ background: 'teal', border: 'none', borderRadius: '5px' }}
                                    onClick={() => handleEditClick(playlist)}>
                                    <i className="fa-solid fa-edit" style={{ color: '#fff' }}></i>
                                  </button>
                                </td>
                                <td className="text-center">
                                  <button
                                    onClick={() => handleDeletePlaylist(playlist.id)}
                                    className="btn btn-sm btn-danger">
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

        {/* Edit Playlist Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5>Edit Playlist</h5>
              <input
                type="text"
                placeholder="Playlist Name"
                value={editPlaylist.name}
                onChange={(e) => setEditPlaylist({ ...editPlaylist, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Playlist Type"
                value={editPlaylist.type}
                onChange={(e) => setEditPlaylist({ ...editPlaylist, type: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={editPlaylist.description}
                onChange={(e) => setEditPlaylist({ ...editPlaylist, description: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={handleUpdatePlaylist} style={{ background: 'teal', color: '#fff' }}>Update</button>
                <button onClick={() => setShowEditModal(false)} style={{ marginLeft: '10px' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}


 {/* Add Asset to Playlist Modal Start */}
 {showAddAssetModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h5>Add Asset to Playlist</h5>
      <div>
        <label>Select Playlist:</label>
        <select
          className="form-control"
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option value="">-- Select Playlist --</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Asset:</label>
        <select
          className="form-control"
          value={selectedAsset}
          onChange={(e) => {
            setSelectedAsset(e.target.value);
            console.log("Selected Asset:", e.target.value); 
          }}
        >
          <option value="">-- Select Asset --</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name}
            </option>
          ))}
        </select>
      </div>
      <div className="modal-actions">
        <button onClick={handleAddAssetToPlaylist} style={{ background: 'teal', color: '#fff' }}>
          Add
        </button>
        <button onClick={() => setShowAddAssetModal(false)} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        {/* Add Asset to Playlist Modal End */}



      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Video;
