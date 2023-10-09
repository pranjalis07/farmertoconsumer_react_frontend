
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CCviewQCFreeLoc.css'; // Import the CSS file
import Cookies from 'js-cookie';
import {  Link, useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';



// working  - add data

function CCviewQCFreeLoc() {
  const [location, setLocation] = useState('');
  const [qualityCheckers, setQualityCheckers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
    const navigate = useNavigate();
  const { requestId } = useParams();
  useEffect(() => {
    // Fetch the list of quality checkers from the backend
    const fetchQualityCheckers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/QCAdmin/quality-checkers`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the Authorization header with the access token
          },
        });
        console.log("QC",response.data)
        setQualityCheckers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchQualityCheckers();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    axios
    .get(`/api/QCAdmin/free-qcs?location=${location}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the Authorization header with the access token
      },
    })
    .then((response) => {
      setQualityCheckers(response.data);
      setLoading(false);
      console.log(response.data);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  };

  const handleAssignQC = (qcId) => {
    axios
  .post(`/api/QCAdmin/assign-qc-to-farmer/${requestId}/${qcId}`, null, {
   // .post(`/api/roleccqc/assign-qc-to-farmer/${qcId}`, {
     headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    })
     .then((response) => {
     // Check if the assignment was successful
   if (response.status === 200) {
     // Navigate to CCassignQCtoF with a success message as state
//  navigate('/CCassignQCtoF', { state: { success: true } });
    alert('Assigned successfully!');   } 
   else {
    // Handle other status codes or show an error message
     console.error('Error:', response.data);
     }
    })
     .catch((error) => {
     console.error('Error:', error);
    // Handle any error or show a failure message
    });
    };

  return (
    <div className="qc-dashboard">
    <nav className="ccleft-navigation">
      <ul>
    <Link to ="/CCViewFReqList">   <li><button>See Farmer List</button></li> </Link> 
   {/* <Link to ="/allqc"  >  <li><button>QC List</button></li> </Link> 
        <li><button>Admin Work Response</button></li> */}
        <li><button>Notifications</button></li>
        <li><button>Settings</button></li>
      </ul>
    </nav>
    <div className="content">
    <header className="cctop-navigation">
          <h1 className="welcome-text">Welcome to Call Center Employee Portal</h1>
          {/* <div className="notification-icon">
            <FontAwesomeIcon icon={faBell} />
          </div> */}
          <button className="ccprofile-button">
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
      
      
 
       <div className="containerccviewqcfreeloc">
  <div className='h1tagandinputbutton'>
  <h1 className="h1ccviewqcfreeloc">Find Nearest Quality Check Employee</h1>
  <div>
    <input
      className="search-barccviewqcfreeloc"
      type="text"
      placeholder="Enter Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button className="button-barccviewqcfreeloc" onClick={handleSearch}>Search</button>
  </div>
  </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : qualityCheckers.length > 0 ? (
        <div className='ccviewqcreqlistdivcontainer'>
          <table  className='ccviewqcreqlisttable'>
          <thead className='ccviewqcreqlistthead'>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Contact </th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody className='barccviewqcfreeloctbody'>
            {qualityCheckers.map((qc) => (
              <tr key={qc.id}>
                <td>{qc.id.slice(-6)}</td>
                <td>{qc.firstName +" "+qc.lastName}</td>
                <td>{qc.phoneNo}</td>
                <td>{qc.address}</td>
                <td>{qc.qcAvailable}</td>
                {/* Add more fields as needed */}
                <td>
<button className="button-barccviewqcfreeloc" onClick={() => handleAssignQC(qc.id)}>Assign</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
      ) : (
        <p>No Quality Checkers found in this location.</p>
      )}
    </div>
    </div>
  </div>

  );
}

export default CCviewQCFreeLoc;
