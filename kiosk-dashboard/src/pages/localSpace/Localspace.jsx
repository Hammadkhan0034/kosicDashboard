import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import api from '../../components/services/api';

// Modal Component for playing video or viewing image
const AssetModal = ({ isOpen, assetSrc, isVideo, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', zIndex: 1050, marginLeft:"20%" }}
      id="assetModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="assetModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="assetModalLabel">
              {isVideo ? 'Video Player' : 'Image Viewer'}
            </h5>
            <button type="button" className="close" onClick={onClose} style={{marginLeft:"60%", borderRadius:"3px", background: "teal", color: "#ffff", border: "none"}}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {isVideo ? (
              <video controls width="100%" className="img-thumbnail">
                <source src={assetSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={assetSrc} alt="Asset" className="img-thumbnail" width="100%" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Localspace() {
  const { playlistId } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get('/all_playlists_with_assets/');
        const playlist = response.data.find((item) => item.id === parseInt(playlistId));

        if (playlist) {
          const updatedAssets = playlist.asset.map((asset) => ({
            ...asset,
            uri: `https://storage.googleapis.com/gw_videostore/uploads/${asset.uri}`,
          }));
          
          setAssets(updatedAssets);
        } else {
          console.error(`Playlist with id ${playlistId} not found`);
          setAssets([]);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [playlistId]);

  const openModal = (asset) => {
    setCurrentAsset(asset);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentAsset(null);
  };

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
                  <div className="border-radius-lg pt-4 pb-3" style={{ background: '#3ab371' }}>
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
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Asset_id</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thumbnail</th>
                              </tr>
                            </thead>
                            <tbody>
                              {assets.map((asset, index) => (
                                <tr key={asset.id}>
                                  <td>{index + 1}</td>
                                  <td>{asset.asset_id}</td>
                                  <td>{asset.order}</td>
                                  <td>{asset.description}</td>

                                  <td style={{ cursor: "pointer" }}>
                                      {asset.uri.split('?')[0].endsWith('.mp4') ? (
                                        <button style={{ height: "35px", color: "#ffff", background: "teal", fontSize: "15px" }}
                                          src={`https://storage.googleapis.com/gw_videostore/uploads/${asset.uri.split('?')[0].replace('.mp4', '_thumbnail.png')}`}
                                          alt="Video thumbnail"
                                          className="img-thumbnail"
                                          width="100"
                                          onClick={() => openModal({ uri: asset.uri, isVideo: true })}
                                        >View Asset</button>  
                                      ) : (
                                        <button
                                          style={{ height: "35px", color: "#ffff", background: "teal", fontSize: "15px" }}
                                          src={asset.uri}
                                          alt="Image thumbnail"
                                          className="img-thumbnail"
                                          width="100"
                                          onClick={() => openModal({ uri: asset.uri, isVideo: false })}
                                        >View Asset</button>
                                      )}
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
      {/* Asset Modal */}
      <AssetModal
        isOpen={isModalOpen}
        assetSrc={currentAsset?.uri}
        isVideo={currentAsset?.isVideo}
        onClose={closeModal}
      />
    </>
  );
}

export default Localspace;

