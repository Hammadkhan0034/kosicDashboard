import React from 'react'
// import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Table } from 'react-bootstrap'; 
// import { useParams } from 'react-router-dom';
// import api from '../services/api'

const SingleDevice = () => {
  // const {deviceId} = useParams();
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
                      <div className="border-radius-lg pt-4 pb-3" style={{ background: 'Teal' }}>
                        <h6 className="text-white text-capitalize ps-3">Single Device</h6>
                      </div>
                    </div>
                    <div className="card-body px-0 pb-2" style={{ display: "flex", justifyContent: "end", marginRight: "10px"}}> 
                      </div>
                    <div className="card-body px-0 pb-2">
                      <div className="table-responsive p-0">
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">MAC Address</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">IP Address</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client Version</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Playlist</th>
                            </tr>
                          </thead>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      );
}

export default SingleDevice
