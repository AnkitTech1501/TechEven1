import React, { useState } from 'react';
import { useNavigate,useParams,useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nicepage.css';
import './Dashboard.css';
import axios from 'axios';

export default function ShowEstimateEvent() {
    const [estimateData, setEstimateData] = useState([]);
    const [estimateChildData, setEstimateChildData] = useState([]);
    const [pax, setPax] = useState(0);
    const [fabriconStages, setFabriconStages] = useState([]);
    const [fabriconPlatforms, setFabriconPlatforms] = useState([]);
    const [selectedEstimate, setSelectedEstimate] = useState('');
    const [subChildEstimate,setSubChildEstimate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [selectedText,setSelectedText] = useState("");
    const [selectedText1,setSelectedText1] = useState("");
    const navigate = useNavigate();
    const { eventId } = useParams();
    const location = useLocation();
    const role = location.state?.role || '';
    const pmId = location.state?.pmId || '';
    const compId = location.state?.compId || '';
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };
    const fetchEstimateData = async (estimateValue) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/${estimateValue}`);
            setEstimateData(response.data || []);
        } catch (err) {
            console.error(err);
            setEstimateData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchEstimateChildData = async (paxValue) => {
        setLoading1(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/dropdown_values_for_both`);
            setEstimateChildData(response.data || []);
        } catch (err) {
            console.error(err);
            setEstimateChildData([]);
        } finally {
            setLoading1(false);
        }
    };

    const fetchEstimateSubChildData = async (childEstimateVal) => {
        setLoading2(true);
        try {
            let childEstimateUrl = '';
            const params = { pax };
            if (childEstimateVal === 'Fabrication') {
                childEstimateUrl = 'fabrication_stages';
                const [stagesResponse, platformsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/${childEstimateUrl}`, { params }), 
                    axios.get(`${process.env.REACT_APP_API_URL}/fabrication_platforms`, { params }) // Pass 
                ]);
                setFabriconStages(stagesResponse.data || []);
                setFabriconPlatforms(platformsResponse.data || []);
            } else {
                childEstimateUrl = childEstimateVal;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/${childEstimateUrl}`, { params }); // Pass params
                setFabriconStages(response.data || []);
                setFabriconPlatforms([]);
            }
        } catch (err) {
            console.error(err);
            setFabriconStages([]);
            setFabriconPlatforms([]);
        } finally {
            setLoading2(false);
        }
    };
    
    const handleChange = async (e) => {
        const estimateValue = e.target.value;
        setSelectedEstimate(estimateValue);
        if (estimateValue.length > 0) {
            if(estimateValue == 'projector_setups'){
                setSelectedText('Projector Setup');
            }
            else{
                setSelectedText('Led Setup'); 
            }
            await fetchEstimateData(estimateValue);
            // Fetch child data after fetching estimate data
        } else {
            setEstimateData([]);
            setEstimateChildData([]);
        }
    };
  
    
    const handleEstimateChange = (e) => {
        let data = e.target.value.replace("Pax", "").trim();
        if(selectedEstimate == 'ledsetups' && data == '100'){
            data = "1000"
        }
        setPax(data);
        if (data > 0) {
            fetchEstimateChildData(data);
        } else {
            setEstimateChildData([]);
        }
    };

    const handleEstimateChildChange = (e) => {
        const estimateVal = e.target.value;  // Get the selected value
        if (estimateVal) {
            setSelectedText1(estimateVal);
            fetchEstimateSubChildData(estimateVal);
        } else {
            setFabriconStages([]);
            setFabriconPlatforms([]);
        }
    };
    const handleEstimateSubChildChange = (e) => {
        console.log("fabrication_stages = ",fabriconStages);
        const options = e.target.options;
        const subChildValue = e.target.value;
        const values = [];
        if(subChildValue.length > 0){
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    values.push(options[i].value);
                }
            }
            const arr = fabriconStages.filter(product => values.includes(product.id.toString()));
            console.log("arr = ",arr);
            setSubChildEstimate(arr);
        }
        else{
            setSubChildEstimate([]);
        }
    }
    const handleNext = (e) =>{
        e.preventDefault();
        navigate(`/dashboard/nextestimatesevent/${eventId}`,
        {state:
            {  
                role:role, 
                pmId : pmId,
                estimateType : 'event',
                estimate_data_selected : subChildEstimate,
                setup : selectedText,
                pax : pax,
                estimate_parent : selectedText1
            }
        });
    }
    return (
        <>
            <div className="u-body u-xl-mode" data-lang="en">
                <header className="border-bottom py-2">
                    <div className="row align-items-center">
                        <div className="col-md-4 ml-2 d-flex justify-content-left align-items-center">
                            <a href="#" className="navbar-brand">
                                <img
                                    src="../../images/logo1.png"
                                    alt="Logo"
                                    className="img-fluid"
                                    style={{ maxHeight: '75px' }}
                                />
                            </a>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center align-items-center">
                            <a className="" title="Facebook" target="_blank" rel="noopener noreferrer" href="https://facebook.com/name">
                                <img className="img-fluid" src="../../images/270712024.png" alt="" style={{ width: '62px', height: '55px' }} />
                            </a>
                            <a className="" title="Twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/name">
                                <img className="img-fluid" src="../../images/27072024.png" alt="" style={{ width: '60px', height: '54px' }} />
                            </a>
                            <a className="" title="Instagram" target="_blank" rel="noopener noreferrer" href="https://instagram.com/name">
                                <img className="img-fluid" src="../../images/11820224.png" alt="" style={{ width: '50px' }} />
                            </a>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <span className="d-none d-md-inline" style={{ color: '#123abc', marginRight: '10px' }}>
                                Logout
                            </span>
                            <img
                                src="../../images/4033019.png"
                                alt="Logout"
                                className="img-fluid"
                                style={{ maxWidth: '40px', cursor: 'pointer' }}
                                onClick={handleLogout}
                            />
                        </div>
                    </div>

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
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <img
                            src="../../images/logo1.png"
                            alt="Logo"
                            className="img-fluid"
                            style={{ maxHeight: '75px' }}
                        />
                    </div>
                </div>

                <div className="card mt-4 border-0">
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-6 ms-4">
                                <a className="estimateButtonActive">Event</a>
                                <a className="estimateButtonInActive">Conference/Exhibition</a>
                                <a className="estimateButtonInActive">Inclinic Solution</a>
                            </div>
                        </div>

                        <h6 className="mt-5"><b>Select Event Type</b></h6>
                        <select className="form-select" onChange={handleChange} value={selectedEstimate}>
                            <option value=''>Select</option>
                            <option value="projector_setups">Projector Set Up</option>
                            <option value="ledsetups">Led Set Up</option>
                        </select>

                        {loading && <div>Loading...</div>}

                        {estimateData.length > 0 && (
                            <div className="mt-4">
                                <h6><b>Select Estimate Type</b></h6>
                                <select className="form-select" onChange={handleEstimateChange}>
                                    <option value=''>Select Estimate</option>
                                    {estimateData.map((item, index) => (
                                        <option key={index} value={item.value}>{item.value}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {loading1 && <div>Loading...</div>}
                        {estimateChildData.length > 0 && (
                            <div className="mt-4">
                                <h6><b>Select Estimate Data</b></h6>
                                <select className="form-select" onChange={handleEstimateChildChange}>
                                    <option value=''>Select Estimate Data</option>
                                    {estimateChildData.map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {loading2 && <div>Loading...</div>}
                        <div className="row">
                            {fabriconStages.length > 0 || fabriconPlatforms.length > 0 ? (
                                <div className="col-12 mt-4">
                                    <h6><b>Select EStimate</b></h6>
                                    <select className="form-select" multiple onChange = {handleEstimateSubChildChange} size="15">
                                        <optgroup label="Fabrication Stage">
                                            
                                            {fabriconStages.map((item, index) => (
                                                <option key={index} value={item.id}>{item.ELEMENT}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label  = "Fabrication Platform">
                                               {
                                                fabriconPlatforms.map((item, index) => (
                                                <option key={index} value={item.id}>{item.ELEMENT}</option>
                                                ) )  
                                             } 
                                        </optgroup>

                                    </select>
                                </div>
                            ) : ''}
                        </div>
                        {subChildEstimate.length > 0 && (
                            <p>
                                <a className="estimateButtonInActive" onClick = {(e) => {handleNext(e)}}>Next  --></a>
                            </p>
                            
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
