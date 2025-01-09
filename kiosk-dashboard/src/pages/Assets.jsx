import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { uploadAsset, getAssets, deleteAsset, updateAsset } from '../components/services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Assets() {
    const [assets, setAssets] = useState([]);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState(null); 

    // For Edit Record states...
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editAssetId, setEditAssetId] = useState(null);
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            const data = await getAssets();
            setAssets(data);
            toast.success('Assets loaded successfully!');
        } catch (error) {
            console.error('Failed to fetch assets:', error);
            toast.error('Failed to load assets.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleUpload = async () => {
        if (!file || !description) {
            toast.warn('Please provide both a file and a description');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('type', file.type.startsWith('video') ? 'video' : 'image');

        try {
            setUploading(true);
            await uploadAsset(formData);
            toast.success('Asset uploaded successfully!');
            fetchAssets();
        } catch (error) {
            console.error('Failed to upload asset:', error);
            toast.error('Failed to upload asset.');
        } finally {
            setUploading(false);
            setFile(null);
            setDescription('');
        }
    };

    const handleDelete = async (assetId) => {
        try {
            await deleteAsset(assetId);
            setAssets(assets.filter((asset) => asset.id !== assetId));
            toast.success('Asset deleted successfully');
        } catch (error) {
            console.error('Error deleting asset:', error);
            toast.error('Failed to delete asset.');
        }
    };


/////////////////////////////////////////////////////////////////////

    // Edit Functionality
    const handleEditClick = (asset) => {
        setEditAssetId(asset.id);
        setEditDescription(asset.description);
        setEditModalVisible(true);
    };

    const handleEditSave = async () => {
        if (!editDescription) {
            toast.warn('Description cannot be empty');
            return;
        }
        try {
            await updateAsset(editAssetId, { description: editDescription });
            toast.success('Asset updated successfully!');
            fetchAssets(); 
            setEditModalVisible(false);
            setEditAssetId(null);
            setEditDescription('');
        } catch (error) {
            console.error('Failed to update asset:', error);
            toast.error('Failed to update asset.');
        }
    };
////////////////////////////////////////////////////////////////

// Handle asset click
    const handleAssetClick = (asset) => {
        setSelectedAsset(asset);
    };

    const closeModal = () => {
        setSelectedAsset(null);
    };

    return (
        <>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <Navbar />
                {(loading || uploading) && <Spinner />}

                <div className="container-fluid py-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="shadow-dark border-radius-lg pt-4 pb-3"
                                        style={{border:"1px solid grey", background:"teal"}}>
                                    
                                        <h6 className="text-white ps-3" style={{fontSize:"24px"}}>All Assets Details</h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <div className="text-end m-4">
                                        <button
                                            // className="btn btn-secondary"
                                            style={{background:"teal",padding:"12",  color: "#fff", border:"none", borderRadius:"5px"}}
                                            data-bs-toggle="modal"
                                            data-bs-target="#uploadModal"
                                        >
                                            + Upload Media
                                        </button>
                                    </div>
                                    <div className="table-responsive p-0">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className='record'>No</th>
                                                    <th className='record'>Description</th>
                                                    <th className="text-center">Asset</th>
                                                    <th className="text-center">Edit</th>
                                                    <th className="text-center">Delete</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assets.length > 0 ? (
                                                    assets.map((asset, index) => (
                                                        <tr key={asset._id || index}>
                                                            <td>{index + 1}</td>
                                                            <td>{asset.description}</td>
                                                            <td className="align-middle text-center">
                                                                {asset.type === 'image' ? (
                                                                    <img
                                                                        src={asset.file}
                                                                        alt={asset.name}
                                                                        className="border-radius-lg"
                                                                        width="50"
                                                                        onClick={() => handleAssetClick(asset)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                ) : (
                                                                    <video
                                                                        src={asset.file}
                                                                        width="50"
                                                                        className="border-radius-lg"
                                                                        onClick={() => handleAssetClick(asset)}
                                                                        style={{ cursor: 'pointer' }}>
                                                                    
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                )}
                                                            </td>
                                                           
                                                            <td>
                                                                <button style={{background:"teal", border:"none", borderRadius:"5px", padding:"px"}}
                                                                    onClick={() => handleEditClick(asset)} >
                                                                    <i className="fa-solid fa-edit" style={{color:"#fff"}}></i>
                                                                </button>                                                         
                                                            </td>
                                                                

                                                            <td className="align-middle text-center">
                                                                <button
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => asset.id ? handleDelete(asset.id) : toast.warn('Asset ID is missing')}
                                                                    style={{background:"red", border:"none", borderRadius:"5px", padding:"px"}}>
                                                                        <i className="fa-solid fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">
                                                            No assets available.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Modal */}
                <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="uploadModalLabel">Upload Media</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="file" className="form-control mb-2" onChange={handleFileChange} />
                                <input
                                    type="text"
                                    className="form-control mb-1"
                                    placeholder="Description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


             {/* Edit Modal */}
{editModalVisible && (
    <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Asset</h5>
                    <button type="button" className="btn-close" onClick={() => setEditModalVisible(false)}></button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-primary"
                        onClick={handleEditSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
)}



                {/* Preview Modal */}
                {selectedAsset && (
                    <div className="modal show d-block" tabIndex="-1" onClick={closeModal}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Preview</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body text-center">
                                    {selectedAsset.type === 'image' ? (
                                        <img src={selectedAsset.file} alt="Preview" className="img-fluid" />
                                    ) : (
                                        <video src={selectedAsset.file} controls className="img-fluid"></video>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default Assets;



