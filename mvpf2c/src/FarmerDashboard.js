import React, { useEffect, useState } from "react";
import axios from "axios";
import './FarmerDashboard.css';
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import Cookies from "js-cookie";

/*10701a671613483eb7e1795597d5a57a */
function FarmerDashboard() {
    // const [news, setNews] = useState([]); // State to store news data

    useEffect(() => {
      // Function to fetch news data from the Open News API
      const fetchNews = async () => {
        // try {
        //   const response = await axios.get(
        //     'https://newsapi.org/v2/everything?q=agriculture+India&apiKey=10701a671613483eb7e1795597d5a57a '
        //   );
        //   setNews(response.data.articles);
        // } catch (error) {
        //   console.error('Error fetching news:', error);
        // }
      };
     
      fetchNews(); // Call the fetchNews function when the component mounts
    }, []);
    const navigate = useNavigate();
    const logoutFunc = () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('phoneNo');
  console.log("logoutexecuted");
      navigate('/signin');
    };
  return (
    <div className="farmer-dashboard">
      
      <nav className="fleft-navigation">
        <ul>
          <li className="listfarmerdashboard" ><button>Home</button></li>
          <Link to ="/addcrop"><li className="listfarmerdashboard"><button>Add New Crop</button></li></Link>
   <Link to ="/getcroplist">      <li className="listfarmerdashboard"  ><button>Crop List</button></li></Link> 
          <li className="listfarmerdashboard"  ><button>Order List</button></li>
          <li className="listfarmerdashboard"  ><button>Payment</button></li>
          <li className="listfarmerdashboard"  ><button>Resourses</button></li>
          <li className="listfarmerdashboard"  ><button>Reports</button></li>
          <li className="listfarmerdashboard"  ><button>Settings</button></li>
          {/* <li className="listfarmerdashboard"> */}
          <button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button>
         
        </ul>
      </nav>
      <div className="fcontent">
       
      <header className="top-navigation">
          
          <h1  className="welcome-text">Welcome to Farmer Portal</h1>
          <button className="ffprofile-button">Profile</button>
        </header>
        
     
      </div>
    </div>
  );
}

export default FarmerDashboard;