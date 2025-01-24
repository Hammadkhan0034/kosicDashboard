import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Main from '../pages/mains/Main';
import AddMain from '../pages/mains/AddMain';
import EditMain from '../pages/mains/EditMain';
import Video from '../pages/videos/Video';
import AddVideo from '../pages/videos/AddVideo';
import EditVideo from '../pages/videos/EditVideo';
import Localspace from '../pages/localSpace/Localspace';
import AllDevices from '../pages/AllDevices';
import SingleDevice from '../components/singleDevice/SingleDevice';
import Device from '../components/device/Device';

import Playlist from '../components/playlist/Playlist';

import AddLocalspace from '../pages/localSpace/AddLocalspace';
import EditLocalspace from '../pages/localSpace/EditLocalspace';
import AddAssetsToPlaylist from '../pages/storeSpecial/AddAssetsToPlaylist';
import AddStoreSpecial from '../pages/storeSpecial/AddStoreSpecial';
import EditStoreSpecial from '../pages/storeSpecial/EditStoreSpecial';
import Assets from '../pages/Assets';
import Login from '../pages/Login';



function AppRoutes() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-main"
          element={
            <ProtectedRoute>
              <AddMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-main"
          element={
            <ProtectedRoute>
              <EditMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video"
          element={
            <ProtectedRoute>
              <Video />
            </ProtectedRoute>
          }
        />
        <Route
          path='/all-devices'
          element={
            <ProtectedRoute>
              <AllDevices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/single-device/:deviceId"
          element={
            <ProtectedRoute>
              <SingleDevice />
            </ProtectedRoute>
          }
        />
        <Route
          path='/device/:deviceID'
          element={
            <ProtectedRoute>
              <Device />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-video"
          element={
            <ProtectedRoute>
              <AddVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-video"
          element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          }
        />

        <Route
          path='/playlist/:playlistId'
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          }/>
      
        <Route
          path="/add-local-space"
          element={
            <ProtectedRoute>
              <AddLocalspace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-local-space"
          element={
            <ProtectedRoute>
              <EditLocalspace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store-special"
          element={
            <ProtectedRoute>
              <AddAssetsToPlaylist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-store-special"
          element={
            <ProtectedRoute>
              <AddStoreSpecial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-store-special"
          element={
            <ProtectedRoute>
              <EditStoreSpecial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-assets-to-playlist"
          element={
            <ProtectedRoute>
              <AddAssetsToPlaylist />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
