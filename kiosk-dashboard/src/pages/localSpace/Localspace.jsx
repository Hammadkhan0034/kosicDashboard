import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import api from '../../components/services/api';

function Localspace() {
  const { playlistId } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get('/all_playlists_with_assets/');
        console.log('API Response:', response.data);

        const playlist = response.data.find((item) => item.id === parseInt(playlistId));

        if (playlist) {
          setAssets(playlist.asset);
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
                  <div className="border-radius-lg pt-4 pb-3" style={{background: "#3cb371"}}>
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
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Asset ID</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {assets.map((asset, index) => (
                                <tr key={asset.id}>
                                  <td>{index + 1}</td>
                                  <td>{asset.asset_id}</td>
                                  <td>{asset.description}</td>
                                  <td>
                                    <button
                                    
                                      className="btn btn-primary btn-sm"
                                      onClick={() => setSelectedAsset(asset)}
                                    >
                                      View Asset
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

              {/* Selected Asset Display */}
              {selectedAsset && (
                <div className="card mt-4">
                  <div className="card-header">
                    <h6 className="text-capitalize">Selected Asset Details</h6>
                  </div>
                  <div className="card-body">
                    <h6>Asset ID: {selectedAsset.asset_id}</h6>
                    <p>Description: {selectedAsset.description}</p>

                    {selectedAsset.file}

                    {selectedAsset.uri.endsWith('.mp4') ? (
                      <video
                        src={selectedAsset.uri}
                        controls
                        width="100%"
                        className="img-thumbnail"
                      />
                    ) : (
                      <img
                        src={selectedAsset.uri}
                        alt={selectedAsset.description}
                        className="img-thumbnail"
                        width="100%"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Localspace;
