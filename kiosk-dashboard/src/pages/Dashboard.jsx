import React from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


function Dashboard() {
  return (
    <>
      <Sidebar/>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar/>
        <div className="container-fluid py-2">
            <div className="row">
                <div className="ms-3 align-iterm-center d-flex justify-content-between">
                <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
                <Link className="btn btn-secondary me-4" to="/assets"><i className="fa-solid fa-plus"></i> Create Assets</Link>
                
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Today's Money</p>
                        <h4 className="mb-0">$53k</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">weekend</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+55% </span>than last week</p>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Today's Users</p>
                        <h4 className="mb-0">2300</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">person</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+3% </span>than last month</p>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Ads Views</p>
                        <h4 className="mb-0">3,462</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">leaderboard</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-danger font-weight-bolder">-2% </span>than yesterday</p>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                <div className="card">
                    <div className="card-header p-2 ps-3">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="text-sm mb-0 text-capitalize">Sales</p>
                        <h4 className="mb-0">$103,430</h4>
                        </div>
                        <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                        <i className="material-symbols-rounded opacity-10">weekend</i>
                        </div>
                    </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer p-2 ps-3">
                    <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+5% </span>than yesterday</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 mt-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <h6 className="mb-0 ">Website Views</h6>
                        <p className="text-sm ">Last Campaign Performance</p>
                        <div className="pe-2">
                            <div className="chart">
                            <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>
                            </div>
                        </div>
                        <hr className="dark horizontal"/>
                        <div className="d-flex ">
                            <i className="material-symbols-rounded text-sm my-auto me-1">schedule</i>
                            <p className="mb-0 text-sm"> campaign sent 2 days ago </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mt-4 mb-4">
                <div className="card ">
                    <div className="card-body">
                        <h6 className="mb-0 "> Daily Sales </h6>
                        <p className="text-sm "> (<span className="font-weight-bolder">+15%</span>) increase in today sales. </p>
                        <div className="pe-2">
                            <div className="chart">
                            <canvas id="chart-line" className="chart-canvas" height="170"></canvas>
                            </div>
                        </div>
                        <hr className="dark horizontal"/>
                        <div className="d-flex ">
                            <i className="material-symbols-rounded text-sm my-auto me-1">schedule</i>
                            <p className="mb-0 text-sm"> updated 4 min ago </p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 mt-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-0 ">Completed Tasks</h6>
                            <p className="text-sm ">Last Campaign Performance</p>
                            <div className="pe-2">
                                <div className="chart">
                                <canvas id="chart-line-tasks" className="chart-canvas" height="170"></canvas>
                                </div>
                            </div>
                            <hr className="dark horizontal"/>
                            <div className="d-flex ">
                                <i className="material-symbols-rounded text-sm my-auto me-1">schedule</i>
                                <p className="mb-0 text-sm">just updated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Dashboard
