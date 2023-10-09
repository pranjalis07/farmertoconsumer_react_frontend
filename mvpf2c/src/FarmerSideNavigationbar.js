import { Link } from "react-router-dom";
import './FarmerSideNavigationbar.css'
import React from 'react';
const SideNavigationbar = () => {
    return ( 

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
        <li className="listfarmerdashboard"  ><button>Logout</button></li>
      </ul>
    </nav>
     );
}
 
export default SideNavigationbar;