import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nicepage.css';
import './Dashboard.css';
import axios from 'axios';
import Header from './Header';
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';
import DataTableComponent from './DataTableComponent';
import { Button } from 'react-bootstrap';

const ShowPmEstimateEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };
    const [estimateData,setEstimateData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const { eventId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState("");
    const pmName = location.state?.pmName || 'Unknown PM';
    const companyName = location.state?.companyName || 'Unknown Company';
    const pmId = location.state?.pmId || '';
    const compId = location.state?.compId || '';
    const role = location.state?.role || '';
    
    useEffect(() => {
        const fetchData = async () => {
           setLoading(true);
            try {
                let response = "";
                if(role == 1){
                    response = await axios.post(`${process.env.REACT_APP_API_URL}/client_estimate`, { eventid: eventId});
                }
                else{
                    response = await axios.post(`${process.env.REACT_APP_API_URL}/pm_estimate`, { pmid: pmId, eventid:eventId});
                }
                
                if(response.status == 200){
                    const estimates = response.data.data;
                    console.log("estimates = ",estimates);
                    setEstimateData(estimates || []);
                }
                // setImages(response.data.images || []);
                // setVideos(response.data.videos || []);
                // setOthers(response.data.others || []);
                // setFeedbackUrl(response.data.feedback_url || '');
            } catch (err) {
                
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const filtered = estimateData.filter(item =>
            (item.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
            (item.date?.toString().toLowerCase().includes(searchTerm.toLowerCase()) || '')
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, estimateData]);
    const handleEditEstimate = (e,estimateId) =>{
        console.log("estimateid =",estimateId);
        e.preventDefault();
        navigate(`/dashboard/editestimatesevent/${eventId}`,
        {state:
            {   
                role : role,
                pmId : pmId,
                estimateType : 'event',
                estimateNo : estimateId,
                estimate_data_selected : estimateData[estimateId-1].estimate_data_selected,
            }
        });
    }
    
    const handleView = (e,role,estimateId) => {
        e.preventDefault();
        navigate(`viewestimates/${estimateId}`,
        {state:
            {
                role:role,
                eventId : eventId,
                pmId : pmId,
                pmName : pmName,
                companyName : companyName,
                estimateType : 'event',
                totalCost : estimateData[estimateId - 1].client_total,
                estimate_data_selected : estimateData[estimateId-1].estimate_data_selected,
            }
        }
        );
    }
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleShowEstimate = () => {
        navigate(`/dashboard/showestimateseevent/${eventId}`,
            {state:
                {
                    eventId,eventId,
                    role:role,
                    pmId : pmId,
                    compId : compId,
                    pmName : pmName,
                    companyName : companyName
                }
            });
    }
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#38077B',
                color: '#fff',
                fontSize: '16px',
                whiteSpace: 'normal', // Allows text to wrap in header cells
                overflow: 'visible',  // Ensures text is not clipped
                wordBreak: 'break-word', // Breaks long words
            },
        },
        cells: {
            style: {
                color: 'black',
                backgroundColor: 'white',
                fontSize: '16px',
                whiteSpace: 'normal', // Allows text to wrap in cells
                overflow: 'visible',  // Ensures text is not clipped
                wordBreak: 'break-word', // Breaks long words
            },
            highlightOnHoverStyle: {
                color: 'white',
                backgroundColor: '#478AC9',
            },
        },
    };

    // Function to get column widths based on role
    const getColumnWidths = () => {
        return {
            estimateNumber: "180px",
            date: "180px",
            clientApproval: "180px",
            purchaseApproval: "190px",
            actions: "600px",
        };
    };

    // Get column widths based on the current role
    const columnWidths = getColumnWidths();

    // Define the columns based on the role
    const columns = [
        {
            name: 'Estimate Number',
            selector: row => row.id,
            width: columnWidths.estimateNumber,
            sortable: true,
            wrap: true
        },
        {
            name: 'Date of Creation',
            selector: row => row.date,
            width: columnWidths.date,
            sortable: true,
            wrap: true
        },
        {
            name: role == 1 ? 'status' : 'Client Approval',
            selector: row => row.status,
            width: columnWidths.clientApproval,
            sortable: true,
            wrap: true
        },
        {
            name: 'Purchase Approval',
            selector: row => 'Pending',
            width: columnWidths.purchaseApproval,
            sortable: true,
            wrap: true
        },
        {
            name: 'Actions',
            width: columnWidths.actions,
            cell: row => (
                <div className="d-flex justify-content-space">
                    <a
                        href=""
                        className='tableAction' style = {{width:'112px'}}
                        title="View"
                        onClick={(e) => { (handleView(e,role,row.id)) }}
                    >
                        VIEW
                    </a>
                    {role == 1 ?  
                    <a
                        href=""
                        className='tableAction' style = {{width:'112px'}}
                        title="View"
                        onClick={(e) => { (e.preventDefault()) }}
                    >
                        Request For Change
                    </a> : 
                    <a
                        href=""
                        className='tableAction' style = {{width:'112px'}}
                        title="View"
                        onClick={(e) => { handleEditEstimate(e,row.id) }}
                    >
                        EDIT ESTIMATE
                    </a>
                    }
                  
                    <a
                        href=""
                        className='tableAction' style = {{width:'112px'}}
                        title="View"
                        onClick={(e) => { (e.preventDefault()) }}
                    >
                        MORE
                    </a>
                </div>
            ),
        }
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <>
            <div className="u-body u-xl-mode" data-lang="en">
                <Header imagTag = '../../'/>
                <section className="u-align-center u-clearfix u-section-1" id="sec-0e20">
                    <div className="u-clearfix u-sheet u-sheet-1">
                        <div className="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-palette-5-light-3 u-layout-wrap-1">
                            <div className="u-gutter-0 u-layout">
                                <div className="u-layout-row">
                                {role == 1 ? 
                                <>
                                <div className="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                                        <div className="u-container-layout u-container-layout-1">
                                            <h4 className="u-align-center u-text u-text-1">Company Name : {companyName}</h4>
                                        </div>
                                    </div> 
                                    <div className="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                                        <div className="u-container-layout u-container-layout-1">
                                            <h4 className="u-align-center u-text u-text-1">PM : {pmName}</h4>
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="u-align-center u-container-style u-layout-cell u-size-60 u-layout-cell-1">
                                        <div className="u-container-layout u-container-layout-1">
                                            <h4 className="u-align-center u-text u-text-1">PM : {pmName}</h4>
                                        </div>
                                    </div>
                                    
                                }
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row align-items-center mt-5 mb-5">
                                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                                {role == 1 ? <div className = 'col-12 col-lg-2 col-md-2 mt-2 mb-2'><Button variant="outline-danger" size="lg" onClick={handleShowEstimate}>
                                Add New Estimate
                            </Button></div> : ''}
                            </div>
                        </div>
                        <DataTableComponent
                            data={currentItems}
                            columns={columns}
                            loading={loading}
                            pagination={{ customStyles }}
                            paginationServer
                            paginationTotalRows={filteredData.length}
                            handlePageChange={handlePageChange}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>

                </section>
            </div>
        </>
    );
}
export default ShowPmEstimateEvent;