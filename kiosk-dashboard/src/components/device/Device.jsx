import React, { useEffect, useState } from "react";
import "./device.css"
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Modal, Button, Table } from "react-bootstrap";
import api, { deletePlaylist } from "../services/api";
import { useParams } from "react-router-dom";
import deleteImage from "../../components/images/delete.png";
import editImage from "../../components/images/edit.png"

const Device = () => {
    const { deviceID } = useParams();
    const [playlists, setPlaylists] = useState([]);
    const [deviceData, setDeviceData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);
    const [loadingDevice, setLoadingDevice] = useState(true);
    const [error, setError] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editPlaylist, setEditPlaylist] = useState(null);

    // Mock assets data
    const [assets] = useState([
        { id: 1, name: "Asset 1" },
        { id: 2, name: "Asset 2" },
    ]);

    // Fetching playlists for the modal selection
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


    const fetchDeviceData = async () => {
        setLoadingDevice(true);
        try {
            const response = await api.get(`/api/devices/${deviceID}`);
            setDeviceData(response.data);

        } catch (error) {
            console.error('Error fetching device data:', error);
        } finally {
            setLoadingDevice(false);
        }
    };

    // Fetch device data when deviceID changes
    useEffect(() => {
        fetchDeviceData();
    }, [deviceID]);


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

            setDeviceData((prevData) => ({
                ...prevData,
                playlist_data: [...prevData.playlist_data, selectedPlaylist],
            }));

        } catch (err) {
            console.error("Error adding playlist to device:", err);
            alert("Failed to add playlist to device.");
        }
    };


    const handleDeletePlaylist = async (playlistId) => {
        try {
            // Send a DELETE request to the API
            await deletePlaylist(playlistId);;
            alert("Playlist deleted successfully!");

            // Update the device data to remove the deleted playlist
            setDeviceData((prevData) => ({
                ...prevData,
                playlist_data: prevData.playlist_data.filter(
                    (playlist) => playlist.id !== playlistId
                ),
            }));
        } catch (err) {
            console.error("Error deleting playlist:", err);
            alert("Failed to delete playlist.");
        }
    };
    ////////////////////////////////////////////////////
    const handleEditPlaylist = (playlist) => {
        setEditPlaylist(playlist);
        setShowEditModal(true);
    };


    const handleUpdatePlaylist = async () => {
        try {
            await api.put(
                `http://35.227.175.189:8080/update_playlist/${editPlaylist.id}/`,
                editPlaylist
            );
            setShowEditModal(false);
            alert("Playlist Added successfully!");

            // Update the playlist in the device 
            setDeviceData((prevData) => ({
                ...prevData,
                playlist_data: prevData.playlist_data.map((playlist) =>
                    playlist.id === editPlaylist.id ? editPlaylist : playlist
                ),
            }));
        } catch (error) {
            console.error("Failed to update playlist:", error.message);
            alert("Failed to update playlist!");
        } finally {

        }
    };

    /////////////////////////////////////////////////////

    // Extract playlist_data from deviceData
    const { playlist_data } = deviceData || {};

    return (
        <>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <Navbar />
                <div className="container-fluid py-2">
                    <div className="row">
                        {/* Device Playlists Section */}
                        <div className="col-6">
                            <div className="card my-4">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="border-radius-lg pt-4 pb-3" style={{ background: "#3ab371" }}>
                                        <h5 className="text-white text-capitalize ps-3">Device Playlists</h5>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <button
                                        className="btn btn-secondary mb-3"
                                        style={{ background: "teal", color: "#fff", borderRadius: "5px", marginLeft: "75%" }}
                                        onClick={() => setShowModal(true)}>
                                        +Add Playlist
                                    </button>
                                    <div className="table-responsive p-0">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Playlist ID</th>
                                                    <th>Playlist Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Display Playlist Data in Table */}
                                                {playlist_data ? (
                                                    playlist_data.map((playlist, index) => (
                                                        <tr key={index}>
                                                            <td>{playlist.id}</td>
                                                            <td>{playlist.name}</td>
                                                            <td className="icons_tables">
                                                                <img src={editImage} alt="EditImage"
                                                                    onClick={() => handleEditPlaylist(playlist)} />
                                                                <img src={deleteImage} alt="DeleteImage"
                                                                    onClick={() => handleDeletePlaylist(playlist.id)} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" className="text-center">
                                                            No Playlist data Available!
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Device Assets Section */}
                        <div className="col-6">
                            <div className="card my-4">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="border-radius-lg pt-4 pb-3" style={{ background: "#3a6fb3" }}>
                                        <h6 className="text-white text-capitalize ps-3">Device Assets</h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <button
                                        className="btn btn-secondary mb-3"
                                        style={{ background: "teal", color: "#fff", borderRadius: "5px" }}
                                    >
                                        Add Asset
                                    </button>
                                    <div className="table-responsive p-0">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Asset ID</th>
                                                    <th>Asset Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assets.length > 0 ? (
                                                    assets.map((asset, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{asset.id}</td>
                                                            <td>{asset.name}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center">
                                                            No assets available.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

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
                            <button onClick={handleUpdatePlaylist} style={{ background: 'teal', color: '#fff', border: "none", borderRadius: "5px" }}>Update</button>
                            <button onClick={() => setShowEditModal(false)} style={{ marginLeft: '10px', border: "1px solid teal", borderRadius: "5px" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for adding playlist */}
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
