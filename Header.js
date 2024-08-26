import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({imagTag = ''}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="border-bottom py-2">
            <div className="row align-items-center">
                {/* Logo Section */}
                <div className="col-md-4 ml-2 d-flex justify-content-left align-items-center">
                    <a href="#" className="navbar-brand">
                        <img
                            src={`${imagTag}images/logo1.png`}
                            alt="Logo"
                            className="img-fluid"
                            style={{ maxHeight: '75px' }} // Ensure the logo scales well
                        />
                    </a>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <a className="" title="Facebook" target="_blank" rel="noopener noreferrer" href="https://facebook.com/name">
                        <img className="img-fluid" src={`${imagTag}images/270712024.png`} alt="" style={{ width: '62px', height: '55px' }} />
                    </a>
                    <a className="" title="Twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/name">
                        <img className="img-fluid" src={`${imagTag}images/27072024.png`} alt="" style={{ width: '60px', height: '54px' }} />
                    </a>
                    <a className="" title="Instagram" target="_blank" rel="noopener noreferrer" href="https://instagram.com/name">
                        <img className="img-fluid" src={`${imagTag}images/11820224.png`} alt="" style={{ width: '50px' }} />
                    </a>
                </div>
                {/* Logout Section */}
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <span className="d-none d-md-inline" style={{ color: '#123abc', marginRight: '10px' }}>
                        Logout
                    </span>
                    <img
                        src={`${imagTag}images/4033019.png`}
                        alt="Logout"
                        className="img-fluid"
                        style={{ maxWidth: '40px', cursor: 'pointer' }}
                        onClick={handleLogout}
                    />
                </div>
            </div>

            {/* Navbar Section */}
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6h16M4 12h16M4 18h16" stroke="#c00707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="col-md-1"></ul>
                    <ul className="navbar-nav col-md-8 justify-content-around">
                        <li className="nav-item">
                            <a className="nav-link" href="Dashboard.html" style={{ color: '#fff' }}>Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Estimate.html" style={{ color: '#fff' }}>Estimates</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="moreestimate.html" style={{ color: '#fff' }}>Approvals</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="creativeclient.html" style={{ color: '#fff' }}>Creatives</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: '#fff' }}>Feedbacks</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
