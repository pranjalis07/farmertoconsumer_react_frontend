import React from 'react';
import './QCDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function QCDashboard() {
  const navigate = useNavigate();
  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };
  return (
    <div className="qc-dashboard">
      <nav className="qcleft-navigation">
        <ul>
     <Link to ="/QCViewFReqList">   <li><button>Verification Request</button></li> </Link>  
         
          <li><button>Approved Request</button></li>
          <li><button>Notifications</button></li>
          <li><button>Settings</button></li>
          <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>

        </ul>
      </nav>
      <div className="content">
        <header   className="qctop-navigation">
          {/* Add your top navigation content here */}
          <h1  className="welcome-text">Welcome to Quality Check Employee Portal</h1>
          <button className="qcprofile-button">Profile</button>
        </header>
        {/* Add your main content here */}
        
      
      </div>
    </div>
  );
}

export default QCDashboard;