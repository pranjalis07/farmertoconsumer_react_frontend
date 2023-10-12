import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import './QCViewFReqList.css';
import animationJSON from "./success2.json";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
//use parth qc login for this demo 
function QCViewFReqList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');

  const [disabledButtons, setDisabledButtons] = useState(new Set());
  //const navigate = useNavigate();
  const initialVariants = {
    opacity: 0,
    scale: 0.9,
  };

  const animateVariants = {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      bounce:0.8,
    },
  };

  const [isVisible, setIsVisible] = useState(false);


  
// CommonJS
const Swal = require('sweetalert2');
  useEffect(() => {
    const qcId = localStorage.getItem('userId'); // Replace with your key
    
    axios
      .get(`/api/QCAdmin/view-all-requests/${qcId}`, {
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
  }, []); // The empty dependency array ensures this effect runs once on component mount.
  
  const handleApprove = (requestId) => {
    if (!requestId || disabledButtons.has(requestId)) {
      return;
    }

    // Disable the button
    disabledButtons.add(requestId);
    setDisabledButtons(new Set(disabledButtons));
    localStorage.setItem(`buttonState_${requestId}`, 'disabled');
    axios
      .post(`/api/QCAdmin/approve/${requestId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsVisible(true);
          // setSuccess(true);
          // setIsPopUpVisible(true);
          // You can also display an alert here
          // alert('You have approved the farmer request successfully.');
        }
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Your work has been saved',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error approving request:', error);

         // Re-enable the button on error
         disabledButtons.delete(requestId);
         setDisabledButtons(new Set(disabledButtons));
         localStorage.removeItem(`buttonState_${requestId}`);
      });
  };
  useEffect(() => {
    // On page load, check localStorage and apply the .disabled class
    requests.forEach((request) => {
      const requestId = request.reqForQCCC;
      const buttonElement = document.querySelector(`button[data-request-id="${requestId}"]`);
      const buttonState = localStorage.getItem(`buttonState_${requestId}`);

      if (buttonState === 'disabled') {
        buttonElement.classList.add('disabled');
      }
    });
  }, [requests]);

  return (
    <div className="qc-dashboard">
    <nav className="qcleft-navigation">
      <ul>
   <Link to ="/QCViewFReqList">   <li><button>Verification Request</button></li> </Link>  
       
        <li><button>Approved Request</button></li>
        <li><button>Notifications</button></li>
        <li><button>Settings</button></li>
        <li><button>Logout</button></li>
      </ul>
    </nav>
    <div className="content">
      <header   className="qctop-navigation">
        {/* Add your top navigation content here */}
        <h1  className="welcome-text">Welcome to Quality Check Employee Portal</h1>
        <button className="qcprofile-button">Profile</button>
      </header>
      {/* Add your main content here */}
     <div className='allocfarmerrequestdivcontainer'>
     <div className='allocfarmerrequestcontainer'>
    <h2 className='allocfarmerrequesth2'>Allocated Farmer Requests</h2>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error.message}</p>
    ) : (
      <table className="request-table">
        <thead className='requesttablethead'>
          <tr>
            <th>Request ID</th>
            <th>Farmer Name</th>

        {/*    <th>CC Employee Name</th>*/}
        <th>CC Employee Name</th>
            <th>QC Assigned Name</th> 

            {/* <th>Call Center Status</th> */}
            
            <th>Quality Check Status</th>
           
            <th>Actions</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.reqForQCCC}>
             <td>{request.reqForQCCC.slice(-6)}</td>
              <td>{request.farmerName}</td>
          {/*    <td>{request.CCEmployeeName}</td> This names are not working ---now work changes in console.log  */}
               <td>{request.ccemployeeName}</td>
              <td>{request.qcassignedName}</td> 
              
              {/* <td>{request.handledCC}</td> */}
            
              <td>{request.handledQC}</td>
             
              <td>
                <Link to={`/QCViewFReqSingle/${request.reqForQCCC}`}><button className='qcdetailsviewbutton' >View</button></Link>
              </td>
              <td>
              <button
                          data-request-id={request.reqForQCCC}
                          onClick={() => handleApprove(request.reqForQCCC)}
                          className={`qcdetailsviewbutton ${
                            disabledButtons.has(request.reqForQCCC) ? 'disabled' : ''
                          }`}
                        >
                          Approve
                        </button>
              </td>
              {/* <button onClick={handleApprove} className="approve-button">Approve</button> */}
 
 {isVisible && <motion.div
      initial={initialVariants}
      animate={animateVariants} style={{
        position: "fixed",
        top: "26%",
        left: "38%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 300,
          backgroundColor: "#ffffff",
          border: "1px solid #cccccc",
          borderRadius: 5,
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      }}  
      className='pop-up-screen'
      
    >
       <motion.lottie src={animationJSON} loop autoplay />
      <h1>Success</h1>
     <p>Crop Request has been Approved Successfully !</p>
      <button onClick={() => setIsVisible(false)}>Close</button>
    </motion.div>}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
     </div>
    
    </div>
  </div>
   
  );
}

export default QCViewFReqList;
