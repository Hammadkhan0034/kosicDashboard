import React from 'react'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
// import { Link } from 'react-router-dom';
function EditVideo() {
    return (
        <>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <Navbar />
                <div className="container-fluid py-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                                        <h6 className="text-white text-capitalize ps-3">Edit Video Play List</h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    <form>
                                        <div class="row">
                                            <div className="col-md-3"></div>
                                            <div class="col-md-6">
                                                <div class="input-group input-group-lg input-group-outline my-3 ms-3">
                                                    <label class="form-label">Play List Name</label>
                                                    <input type="text" class="form-control form-control-lg" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div className="col-md-3"></div>
                                            <div class="col-md-6">
                                                <div class="input-group input-group-lg input-group-outline my-3 ms-3">
                                                    <label class="form-label">Play List Description</label>
                                                    <input type="text" class="form-control form-control-lg" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div className="col-md-3"></div>
                                            <div class="col-md-6">
                                                <div class="input-group input-group-lg input-group-outline my-3 ms-3">
                                                    {/* <span class="form-label mb-4">Play List assign images</span> */}
                                                    <input type="file" class="form-control form-control-lg" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row p-4">
                                            <div className="col-md-4 mt-4">
                                                <img src="../assets/img/bg-smart-home-1.jpg" className="" alt="user1" width={"100%"}/>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <img src="../assets/img/bg-smart-home-1.jpg" className=" " alt="user1" width={"100%"}/>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <img src="../assets/img/bg-smart-home-1.jpg" className="" alt="user1" width={"100%"}/>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <img src="../assets/img/bg-smart-home-1.jpg" className="" alt="user1" width={"100%"}/>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <img src="../assets/img/bg-smart-home-1.jpg" className=" " alt="user1" width={"100%"}/>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                <img src="../assets/img/bg-smart-home-1.jpg" className="" alt="user1" width={"100%"}/>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
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

export default EditVideo
