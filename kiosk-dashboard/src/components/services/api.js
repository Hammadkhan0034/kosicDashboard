import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://35.227.175.189:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken'); 
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Login API call
export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/api/login/', { email, password });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

export default api;


// Upload Asset
export const uploadAsset = async (formData) => {
  try {
    console.log("Api Calling")
    const response = await api.post('/api/asset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Response is", response)
    return response.data;
  } catch (error) {
    console.error('Error uploading asset:', error.response?.data || error.message);
    throw error;
  }
};

// Get All Assets
export const getAssets = async () => {
  try {
    const response = await api.get('/api/asset');
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error.response?.data || error.message);
    throw error;
  }
};


// Delete Asset
export const deleteAsset = async (assetId) => {
  try {
    const response = await api.delete(`/assets/${assetId}/delete/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting asset:', error.response?.data || error.message);
    throw error;
  }
};

//Update Asset
export const updateAsset = async (assetId, updateData) =>{
  try{
const response = await api.put(`/assets/${assetId}/`, updateData);
return response.data;
  }catch(error){
    console.error('Error updating Asset', error.response?.data || error.message);
    throw error
  }
}

// Add Playlist
export const addPlaylist = async (playlistData) => {
  try {
    const response = await api.post('/create_playlist/', playlistData);
    return response.data;
  } catch (error) {
    console.error('Error adding playlist:', error.response?.data || error.message);
    throw error;
  }
};


// Get All Playlists with Assets
export const getAllPlaylists = async () => {
  try {
    const response = await api.get('/all_playlists_with_assets');
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error.response?.data || error.message);
    throw error;
  }
};

// Delete Asset
export const deletePlaylist = async (playlistId) => {
  try {
    const response = await api.delete(`/delete_playlist/${playlistId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting asset:', error.response?.data || error.message);
    throw error;
  }
};

// Update Playlist
export const updatePlaylist = async (playlistId, updatedData) => {
  try {

    console.log("Api calling in updatePlaylist")
    const response = await api.put(`/update_playlist/${playlistId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

