import React, { useState, useEffect } from "react";
import "./addAssetsToPlaylist.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAllPlaylists, getAssets } from "../../components/services/api";
import Footer from "../../components/Footer";
import { Modal, Button } from "react-bootstrap";
import api from "../../components/services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  }, []);

  useEffect(() => {
    if (showModal) {
      fetchAssets();
    }
  }, [showModal]);

  const fetchPlaylists = async () => {
    try {
      const data = await getAllPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Failed to fetch playlists:", error.message);
      toast.error("Failed to load playlists!");
    }
  };

  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
      console.log("data is of assets",data )
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      toast.error("Failed to load assets!");
    }
  };

  const handleAddAssetsToPlaylist = async () => {
    if (selectedPlaylists.length === 0 || selectedAssets.length === 0) {
      alert('Please select at least one playlist and one asset!');
      return;
    }
    setLoading(true);
    const payload = {
      playlist_ids: selectedPlaylists,
      asset_ids: selectedAssets,
    };

    try {
      await api.post("/add-assets-to-playlists/", payload);
      alert("Assets successfully added to playlists!");
      setShowModal(false);
      navigate("/video");
    } catch (error) {
      alert("Failed to add assets to playlists.");
      console.error("Error:", error);
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
                    <h6 className="text-white text-capitalize ps-3">
                      Add Assets to Playlist
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="text-end m-4">
                    <Button
                      variant="secondary"
                      style={{
                        backgroundColor: "teal",
                        color: "#fff",
                        borderRadius: "5px",
                      }}
                      onClick={() => setShowModal(true)}
                    >
                      + Add Assets
                    </Button>
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
          <div>
            {/* Playlists */}
            <h5 className="text-center mb-3">Select Playlists</h5>
            {playlists.length > 0 ? (
              <ul className="list-group mb-4">
                {playlists.map((playlist) => (
                  <li
                    key={playlist.id}
                    className={`list-group-item ${
                      selectedPlaylists.includes(playlist.id) ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedPlaylists((prev) =>
                        prev.includes(playlist.id)
                          ? prev.filter((id) => id !== playlist.id)
                          : [...prev, playlist.id]
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {playlist.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No playlists available.</p>
            )}

            {/* Assets */}
            <h5 className="text-center mb-3">Select Assets</h5>
            {assets.length > 0 ? (
              <ul className="list-group">
                {assets.map((asset) => (
                  <li
                    key={asset.id}
                    className={`list-group-item ${
                      selectedAssets.includes(asset.id) ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedAssets((prev) =>
                        prev.includes(asset.id)
                          ? prev.filter((id) => id !== asset.id)
                          : [...prev, asset.id]
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {asset.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No assets available.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddAssetsToPlaylist}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAssetsToPlaylist;
