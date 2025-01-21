
import React, { useState, useEffect } from 'react';
import "./addAssetsToPlaylist.css"
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getAllPlaylists, getAssets } from '../../components/services/api';
import Footer from '../../components/Footer';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../components/services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

function AddAssetsToPlaylist() {
  const [showModal, setShowModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  useEffect(() => {
    fetchPlaylists();
if(showModal){
  fetchAssets();
} 
  }, [showModal]);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const data = await getAllPlaylists();
      setPlaylists(data);
      // toast.success('Playlists loaded successfully!');
    } catch (error) {
      console.error('Failed to fetch playlists:', error.message);
      toast.error('Failed to load playlists!');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
      toast.error('Failed to load assets!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssetsToPlaylist = async () => {
    setLoading(true);
    const payload = {
      playlist_ids: selectedPlaylists,
      asset_ids: selectedAssets,
    };

    try {
      await api.post('/add-assets-to-playlists/', payload);
      console.log("Payload is", payload )
      toast.success('Assets successfully added to playlists!');
      setShowModal(false);
      navigate('/video')
    } catch (error) {
      toast.error('Failed to add assets to playlists.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">Add Assets to Playlist</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="text-end m-4">
                    <Button
                      variant="secondary"
                      style={{ backgroundColor: 'teal', color: '#fff', borderRadius: '5px' }}
                      onClick={() => setShowModal(true)}
                    >
                      + Add Assets
                    </Button>
                  </div>
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th className="text-center">Total Assets</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/* <td>1</td>
                          <td>Manager</td>
                          <td>Organization</td>
                          <td className="text-center">4</td>
                          <td className="text-center">
                            <i className="fa-solid fa-pen-to-square fs-5 me-3"></i>
                            <i className="fa-solid fa-trash fs-5 me-3 text-danger"></i>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />



      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Add Assets to Playlist</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="d-flex flex-column">
      <div className="mb-3">
        <h5 className="text-center">Select Playlists</h5>
        <div className="d-flex flex-wrap gap-3">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`p-3 border rounded ${selectedPlaylists.includes(playlist.id) ? 'border-primary' : ''}`}
              onClick={() => {
                setSelectedPlaylists((prev) =>
                  prev.includes(playlist.id)
                    ? prev.filter((id) => id !== playlist.id)
                    : [...prev, playlist.id]
                );
              }}
              style={{
                cursor: "pointer",
                backgroundColor: selectedPlaylists.includes(playlist.id)
                  ? "#f0f9ff"
                  : "#fff",
              }}
            >
              <h6>{playlist.name}</h6>
              <p className="mb-0">ID: {playlist.id}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h5 className="text-center">Select Assets</h5>
        <div className="d-flex flex-wrap gap-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={`p-3 border rounded ${selectedAssets.includes(asset.id) ? 'border-primary' : ''}`}
              onClick={() => {
                setSelectedAssets((prev) =>
                  prev.includes(asset.id)
                    ? prev.filter((id) => id !== asset.id)
                    : [...prev, asset.id]
                );
              }}
              style={{
                cursor: "pointer",
                backgroundColor: selectedAssets.includes(asset.id)
                  ? "#f0f9ff"
                  : "#fff",
              }}
            >
              <h6>{asset.name}</h6>
              <p className="mb-0">{asset.type}</p>
              <p className="mb-0">{asset.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleAddAssetsToPlaylist} disabled={loading}>
      {loading ? "Adding..." : "Add"}
    </Button>
  </Modal.Footer>
</Modal>


      {/* Modal for Adding Assets */}
      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Add Assets to Playlist</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>Select Playlists</Form.Label>
        <Form.Control
          as="select"
          multiple
          value={selectedPlaylists}
          onChange={(e) => {
            const selected = [...e.target.selectedOptions].map((o) => parseInt(o.value));
            setSelectedPlaylists(selected);
            console.log("Selected Playlists:", selected); // Log selected playlists
          }}
        >
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Select Assets</Form.Label>
        <Form.Control
          as="select"
          multiple
          value={selectedAssets}
          onChange={(e) => {
            const selected = [...e.target.selectedOptions].map((o) => parseInt(o.value));
            setSelectedAssets(selected);
            console.log("Selected Assets:", selected); 
          }}
        >
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.type}) - {asset.description}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Selected Asset Previews</Form.Label>
        <ul>
          {assets
            .filter((asset) => selectedAssets.includes(asset.id))
            .map((asset) => (
              <li key={asset.id}>
                {asset.name}:{" "}
                {asset.file ? (
                  <a href={asset.file} target="_blank" rel="noopener noreferrer">
                    Preview File
                  </a>
                ) : (
                  "No file available"
                )}
              </li>
            ))}
        </ul>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleAddAssetsToPlaylist} disabled={loading}>
      {loading ? "Adding..." : "Add"}
    </Button>
  </Modal.Footer>
</Modal> */}

    </>
  );
}
export default AddAssetsToPlaylist;

