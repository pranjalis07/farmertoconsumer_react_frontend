import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import './CCviewFReqlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';


function CCviewFReqlist() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');
  const [available,setAvailable]=useState();

  const navigate = useNavigate();


    const logoutFunc = () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('phoneNo');
  console.log("logoutexecuted");
      navigate('/signin');
    };
  useEffect(() => {
    fetchRequests();
  }, [available]);

  const fetchRequests = () => {
    axios
      .get(`/api/QCAdmin/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  const handleChangeStatus = async () => {
   // setIsLoading(true);

    try {
      const response  = await axios.post(`/api/QCAdmin/setEmptyRequestFieldCCQC/${adminId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      const available = response.data.ccAvailable;
      console.log(available);
      setAvailable(available);
    } catch (error) {
      console.log(error);
    } 
  };
  const handleAssignQC = (requestId) => {
  
    navigate(`/CCviewQCFreeLoc/${requestId}`);
  };
  const handleViewRequest = (farmerId, requestId) => {
  navigate(`/CCviewFReqSingle/${farmerId}/${requestId}`);
 };
  return (
    <div className="qc-dashboard">
    <nav className="ccleft-navigation">
      <ul>
    <Link to ="/CCViewFReqList">   <li><button>See Farmer List</button></li> </Link> 
   {/* <Link to ="/allqc"  >  <li><button>QC List</button></li> </Link> 
        <li><button>Admin Work Response</button></li>
         */}
         <li><button>Notifications</button></li>
        <li><button>Settings</button></li>
        <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>

      </ul>
    </nav>
    <div className="content">
      <header   className="cctop-navigation">
        {/* Add your top navigation content here */}
        <h1  className="welcome-text">Welcome to Call Center Employee Portal</h1>
                
        {/* Notification icon */}
          <div className="notification-icon">
          <i className="fas fa-bell"></i>
        </div>
        <button className="profile-button">
            <FontAwesomeIcon icon={faUserCircle}  className="profile-icon" />
          </button>

      </header>
      {/* <div className="search-filter">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
        />
        <button className="search-button">Search</button>
      </div> */}
      {/* Add your main content here */}
       {/* Search filter */}
      
       <div className='ccviewfreqlistdivcontainer'>
      <h1 className='ccviewreqlisth1'>Farmer Verification Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container">
         <div className='statusbuttonCCdiv'><label  className='statusbuttonCClabel'>Status :</label>
         <button className="statusbuttonCC" onClick={handleChangeStatus} >
      <label>{available ? 'Free':'Busy'}</label>
    </button></div>
          <table className="table-container">
            <thead className="ccviewqcreqlistthead">
              <tr>
                <th>Request ID</th>
                {/* <th>Crop ID</th> */}
                
                <th>Farmer Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Crop Name</th>
                <th>Action</th> {/* Add a new column for the action button */}
                <th>Assign QC</th> {/* Add a new column for QC Assign */}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr className='ccviewfreqlisttr' key={request.requestId}>
                  <td>{request.requestId.slice(-6)}</td>
                  {/* <td>{request.cropId}</td> */}
                  
                  <td>{request.farmerName}</td>
                  <td>{request.farmerAddress}</td>
                  <td>{request.farmerContact}</td>
                  <td>{request.cropName}</td>
                   
                   <td>
<button className='viewbuttoncc' onClick={() => handleViewRequest(request.farmerId,request.requestId)}>View</button>
</td>
                   
                  <td>
                 <button className='assignqcbuttoncc' onClick={() => handleAssignQC(request.requestId)}>Assign</button>
                 </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
 
    </div>
  </div>
   
  );
}

export default CCviewFReqlist;



/*
////////////////////////////////////////////// working -   on clikc next page - /CCviewFReqSingle
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './CCviewFReqlist.css';

function CCviewFReqlist() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios
      .get(`/api/roleccqc/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Farmer-to-Call-Center Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container">
          <table className="table-container">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Crop ID</th>
                <th>Farmer ID</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td>
                    <Link to={`/CCviewFReqSingle/${adminId}/${request.requestId}`}>
                      {request.requestId}
                    </Link>
                  </td>
                  <td>{request.cropId}</td>
                  <td>{request.farmerId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CCviewFReqlist;


///////////////////////////////////////////////// working -  only this page

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './CCviewFReqlist.css';

function CCviewFReqlist() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');

  useEffect(() => {
    fetchRequests();
  }, []);
 // empty array excuse

  const fetchRequests = () => {
    axios
      .get(`/api/roleccqc/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          
        },
      })
      .then((response) => {
        setRequests(response.data);
        console.log("three");
        setLoading(false);

      })
      .catch((error) => {
        setError(error); // Set error state
        //     console.error('Error fetching requests:', error);
        console.log("four");
        setLoading(false);
      });
  };

  // ...

  return (
    <div>
      <h1>Farmer-to-Call-Center Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container"> 
          <table className="table-container">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Crop ID</th>
                <th>Farmer ID</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.requestId}</td>
                  <td>{request.cropId}</td>
                  <td>{request.farmerId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
}

export default CCviewFReqlist;

*/
