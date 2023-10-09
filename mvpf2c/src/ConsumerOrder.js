import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate, Link  } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ConsumerOrder.css'; // Import your CSS file

const ConsumerOrder = () => {
  const { consumerId, orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken'); // Add your access token here
  const navigate = useNavigate();

  // For date formation separate function
  const formatDate = (dateArray) => {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    // Use template literals to format the date
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Make a GET request to fetch the order details
        const response = await axios.get(
          `/api/rolec/${consumerId}/view-order/${orderId}`,
          // Add your authorization header if needed
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Format the order date
        const formattedOrderDate = formatDate(response.data.orderDateTime);
        const deliveryDate = formatDate(response.data.probableDeliveryDateTime);
        console.log("Formatted Order Date",formattedOrderDate);
        console.log("Delivery Date",deliveryDate);
        setOrder({
          ...response.data,
          formattedOrderDate,
          deliveryDate,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [consumerId, orderId]);

  const handlePayment=()=>{
    navigate('/payment', { state: { amount: order.totalAmount } });
  }
  return (
    <div className="cons-dashboard">
    <nav className="consumerleft-navigation">
      <ul>
  <Link to="/consumerdashboard">     <li><button className='consumerleftnavbuttonhome'>Home</button></li></Link> 
   <Link to="/crops"> <li><button>Products</button></li></Link> 
   <Link to="/consumerCart/:consumerId"><li><button className='consumerleftnavbuttonmycart'> My Cart</button></li></Link>
   {/* <Link to="/myOrders">  </Link>  */}
   <li><button>Orders</button></li>
        {/* <li><button>Transaction</button></li>
        <li><button>Notification</button></li> */}
        {/* <li><button>Setting</button></li>
        <li><button>Logout</button></li> */}
      </ul>
    </nav>
    <div className="content">
      <header   className="consumertop-navigation">
        {/* Add your top navigation content here */}
        <h1  className="welcome-text">Welcome to F2C Portal</h1>
                
        {/* Notification icon */}
          <div className="notification-icon">
          <i className="fas fa-bell"></i>
        </div>
        <button className="consumerprofile-button">Profile</button>

      </header>
      {/* Add your main content here */}
       {/* Search filter */}
       {/* <div className="search-filter">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
        />
        <button className="search-button">Search</button>
      </div> */}
      
    <div className="order-container">
      <h1 className="order-summary">Order Summary</h1>
      {loading ? (
        <p className="loading">Loading order details...</p>
      ) : order ? (
        <div className='orderdetailsdiv'>
          {/* Display order details here */}
          <p>
            <strong>Order Date and Time:</strong> {order.formattedOrderDate}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.address}
          </p>
          <p>
            <strong>Probable Delivery Date:</strong> {order.deliveryDate}
          </p>
          <p>
            <strong>Order Status:</strong> {order.orderStatus}
          </p>
          <p>
            <strong>Total Amount:</strong> Rs.{order.totalAmount}
          </p>
            {/* Payment Button */}
            <button className='payment-button' onClick={handlePayment}>Pay Now</button>
        

          {/* Add more order details as needed */}
        </div>
      ) : (
        <p className="empty-order">Order not found.</p>
      )}
    </div>
   
    </div>
  </div>
  
  );
};

export default ConsumerOrder;