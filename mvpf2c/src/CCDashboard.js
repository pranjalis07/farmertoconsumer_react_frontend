import React from 'react';
import './CCDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function CCDashboard() {
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
      <nav className="ccleft-navigation">
        <ul>
      <Link to ="/CCViewFReqList">   <li><button >Request List</button></li> </Link> 
     {/* <Link to ="/allqc"  >  <li><button>QC List</button></li> </Link> 
          <li><button>Admin Work Response</button></li> */}
          <li><button >Notifications</button></li>
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
          <button className="profile-button">Profile</button>
  
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
        
        
   
      </div>
    </div>
  );
}

export default CCDashboard;