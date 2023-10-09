// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import './App.css'
// import { Link } from 'react-router-dom';
// function GetCropDetails() {
//   const [cropDetails, setCropDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const accessToken = Cookies.get('accessToken');
//   const farmerId = localStorage.getItem("farmerId");
//   useEffect(() => {
//     // Define the URL of your backend API
//     //const apiUrl = 'http://localhost:8080/api/rolef/getAllCropDetailsForFarmers';

//     // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
//     //const accessToken = 'YOUR_ACCESS_TOKEN';
//     fetchCropDetails();
//   }, []);
//   const fetchreqid = (cropId) => {
//     axios
//       .post(`http://localhost:8080/api/rolef/setEmptyFieldsRequest/${farmerId}/${cropId}`, null, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         console.log('reqid = ', response.data);

//         // Update the approvalStatus for the specific crop in the state
//         const updatedCropDetails = cropDetails.map((crop) => {
//           if (crop.cropId === cropId) {
//             return {
//               ...crop,
//               approvalStatus: 'pending', // Change approval status to "pending"
//             };
//           }
//           return crop;
//         });

//         setCropDetails(updatedCropDetails);
//       })
//       .catch((error) => {
//         console.error('Error publishing crop:', error);
//       });
//   };

// const fetchCropDetails=() =>{
   
//     console.log(accessToken);
//     // Set the Authorization header with the access token
//     // const headers = {
//     //   Authorization: `Bearer ${accessToken}`,
//     // };
 
//     console.log(farmerId);
//     // Make the GET request to the protected endpoint
//     axios.get(`http://localhost:8080/api/rolef/getCropDetailsFarmer/${farmerId}`, 
//         { 
//             headers :{
//                 Authorization: `Bearer ${accessToken}`,
//               } 
//         }
//         )
//         .then((response) => {
//         setCropDetails(response.data);
//         //console.log(cropDetails)
        
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching crop details:', error);
//         setLoading(false);
//       });
// }

//   const handlePublishClick = (cropId) => {
//     // Make a PUT or POST request to your API to update the published status
//     axios
//       .put(`http://localhost:8080/api/rolef/publish/${farmerId}/${cropId}`,null, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         //console.log(response.data);
//         // Refresh the crop details after publishing
//         fetchCropDetails();
//       })
//       .catch((error) => {
//         console.error('Error publishing crop:', error);
//       });
//   };
//   return (
//     <div>
//       <h2>Crop Details for Farmers</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>  Crop Name  </th>
             
//               <th>  Crop Subtype  </th>
//               <th>  Retail Price  </th>
//               <th>  Wholesale Price  </th>
//               <th>  Approval Status  </th>
//               <th>  Published  </th> 
//               <th>  Actions </th>
       
             
//               {/* Include other headers as needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {cropDetails.map((crop, index) => (
//               <tr key={index}>
//                 <td>  {crop.cropName}  </td>
               
//                 <td>  { crop.cropSubType }  </td>
//                 <td>  { crop.cropRetailPrice }  </td>
//                 <td>  { crop.cropWholesalePrice }  </td>
//                 <td>  { crop.approvalStatus ? 'Approved' : 'Pending' }  </td>
//                {/*<td>  { crop.published ? 'Published' : '' }  </td>*/} 
//                <td>
//                   <button
//                     onClick={() => handlePublishClick(crop.cropId)}
//                     disabled={crop.published} // Disable the button if already published
//                     style={{
//                         backgroundColor: crop.published ? 'green' : 'red', // Set the color based on the published status
//                         color: 'white', // Text color
//                         fontWeight: 'bold', // Bold text
//                         cursor: 'pointer',
                       
//                         padding: '10px 20px', // Increase the padding to make the button bigger
//                         fontSize: '16px', // Increase the font size
//                         borderRadius: '5px', // Cursor style
//                       }}
//                   >
//                     {crop.published ? 'Published' : 'Publish'}
//                   </button>
//                 </td>
//                     <td>
//                     <Link
//                     to={`/editCrop/${crop.cropId}`} // Specify the edit route
//                     style={{
//                       marginLeft: '10px', // Add some spacing between buttons
//                       textDecoration: 'none', // Remove underlines
//                     }}
//                   >
//                     <button
//                       style={{
//                         backgroundColor: 'green',
//                         color: 'white',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                         padding: '10px 20px',
//                         fontSize: '16px',
                        
//                         borderRadius: '10px',
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </Link>
//                     </td>
//                     <td>
//                     <button
//                       onClick={() => fetchreqid(crop.cropId)}
//                       disabled={crop.approvalStatus === 'pending'} // Disable the button if approvalStatus is "pending"
//                       style={{
//                         backgroundColor: crop.approvalStatus === 'pending' ? 'lightgreen' : 'green',
//                         color: 'white',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                         padding: '10px 20px',
//                         fontSize: '16px',
//                         borderRadius: '5px',
//                       }}
//                     >
//                       Verify
//                     </button>
//                   </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default GetCropDetails;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// import './App.css'
import { Link } from 'react-router-dom';
import './GetCropDetails.css'
import FarmerSideNavigationbar from './FarmerSideNavigationbar';
import FarmerHeaderBar from './FarmerHeaderBar';
function CropDetails() {
  const [cropDetails, setCropDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const farmerId = localStorage.getItem("userId");
 const [verifyButtonClicked,setVerifyButtonClicked] = useState({});
  useEffect(() => {
    // Define the URL of your backend API
    //const apiUrl = 'http://localhost:8080/api/rolef/getAllCropDetailsForFarmers';

    // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
    //const accessToken = 'YOUR_ACCESS_TOKEN';
    fetchCropDetails();
  }, []);

const fetchCropDetails=() =>{
   
    console.log(accessToken);
    // Set the Authorization header with the access token
    // const headers = {
    //   Authorization: `Bearer ${accessToken}`,
    // };
 
    console.log(farmerId);
    // Make the GET request to the protected endpoint
    axios.get(`/api/rolef/getCropDetailsFarmer/${farmerId}`, 
        { 
            headers :{
                Authorization: `Bearer ${accessToken}`,
              } 
        } 
        )
        .then((response) => {
        setCropDetails(response.data);
        console.log(response.data);
        //console.log(cropDetails)
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching crop details:', error);
        setLoading(false);
      });
}

const fetchreqid = (cropId) => {
  console.log(cropId);
  const crop = cropDetails.find((crop) => crop.cropId === cropId);
  if(crop.approvalStatus === false){
    setVerifyButtonClicked({...verifyButtonClicked,[crop.cropId]:true});
  }

  axios
    .post(`/api/rolef/setEmptyRequestField/${farmerId}/${cropId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log('reqid = ', response.data);

      // Update the approvalStatus for the specific crop in the state
      const updatedCropDetails = cropDetails.map((crop) => {
        if (crop.cropId === cropId) {
          return {
            ...crop,
            approvalStatus: false, // Change approval status to "pending"
          };
        }
        return crop;
      });

      setCropDetails(updatedCropDetails);
    })
    .catch((error) => {
      console.error('Error publishing crop:', error);
    });
};

const handleDeleteClick = (cropId) => {
  // Make a DELETE request to your API to delete the crop
  axios
    .delete(`/api/rolef/deleteCropDetails/${farmerId}/${cropId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      // Refresh the crop details after deletion
      fetchCropDetails();
    })
    .catch((error) => {
      console.error('Error deleting crop:', error);
    });
};
  const handlePublishClick = (cropId) => {
    // Make a PUT or POST request to your API to update the published status
    axios
      .put(`/api/rolef/publish/${farmerId}/${cropId}`,null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        // Refresh the crop details after publishing
        // setVerifyButtonClicked({...verifyButtonClicked,[cropId]:false});
        fetchCropDetails();
      })
      .catch((error) => {
        console.error('Error publishing crop:', error);
      });
  };

  const handleVerifyButtonClick = (event) =>{
    const button = event.target;
    const cropId = button.dataset.cropId;

    button.disabled = true;

    fetchreqid(cropId);
  }



  return (

    <div className="farmer-dashboard">
      
     <FarmerSideNavigationbar/>
      <div className="content">
       
     <FarmerHeaderBar/>
        
    <div className='getcropdetailstablecontainer'>
         {/* <div className="add-crop-button">
        <Link to="/addcrop">
          <button style={{ backgroundColor: '#0cb000'}}>
             Add Crop
          </button>
        </Link>
      </div> */}
      {/* <h2 className='getcropdetailstableh2'>Crop Details for Farmers</h2> */}
    
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='getcropdetailstable'>
          <thead className='getcropdetailstablehead' >
            <tr>
              <th >  Crop Name  </th>
             
              <th>  Crop Subtype  </th>
              <th>  Retail Price (Rs) </th>
              <th>  Wholesale Price (Rs) </th>
              <th>  Verify </th>
              <th>  Approval Status  </th>
              <th>  Published  </th> 
              <th>  Edit </th>
              <th>  Delete </th>
             
             
       
             
              {/* Include other headers as needed */}
            </tr>
          </thead>
          <tbody className='getcropdetailstbody' >
            {cropDetails.map((crop, index) => (
              <tr key={index}>
                <td>  {crop.cropName}  </td>
               
                <td>  { crop.cropSubType }  </td>
                <td>  { crop.cropRetailPrice }  </td>
                <td>  { crop.cropWholesalePrice }  </td>

                     <td>
                    
                    <button
                        className={`verify ${crop.approvalStatus === false ? '':'disabled' }`}
                        data-crop-id={crop.cropId}
                        onClick={handleVerifyButtonClick}
                        disabled={crop.approvalStatus !== false || verifyButtonClicked[crop.cropid]} 
                      >
                    Verify
                   </button>

                  </td>

                <td>  { crop.approvalStatus ? 'Approved' : 'Pending' }  </td>
               {/*<td>  { crop.published ? 'Published' : '' }  </td>*/} 
               <td>
                  <button
                    onClick={() => handlePublishClick(crop.cropId)}
                    disabled={crop.published} // Disable the button if already published
                    style={{
                        backgroundColor: crop.published ? ' #0cb000 ' : '#62a6ff', // Set the color based on the published status
                        color: 'white', // Text color
                        fontWeight: 'bold', // Bold text
                        cursor: 'pointer',
                       
                        padding: '10px 20px', // Increase the padding to make the button bigger
                        fontSize: '16px', // Increase the font size
                        borderRadius: '5px', // Cursor style
                      }}
                  >
                    {crop.published ? 'Published' : 'Publish'}
                  </button>
                </td>
                    <td>
                    <Link
  to={`/editCrop/${crop.cropId}`}
  style={{
    marginLeft: '10px',
    textDecoration: 'none',
  }}
>
  <button
    style={{
      backgroundColor: '#ffffff',
      color: '#646464',
      boxShadow:'0px 0px 5px rgba(0, 0, 0, 0.2)',
      fontWeight: 'bold',
      cursor: 'pointer',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '10px',
    }}
  >
    <FontAwesomeIcon icon={faEdit} />
    
  </button>
</Link>

                    </td>
                    <td>
                    <button
  onClick={() => handleDeleteClick(crop.cropId)}
  style={{
    backgroundColor: '#f23800',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '10px',
  }}
>
  <FontAwesomeIcon icon={faTrash} />
  
</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
     
      </div>
    </div>

  );
}

export default CropDetails;


/* ///////////////////////////


Pranjali src -------
Pranjali Working Get Crop Details 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//import './App.css';
import './GetCropDetails.css';
function CropDetails() {
  const [cropDetails, setCropDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const farmerId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCropDetails();
  }, );

  const fetchCropDetails = () => {
    axios
      .get(`/api/rolef/getCropDetailsFarmer/${farmerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCropDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching crop details:', error);
        setLoading(false);
      });
  };

  const fetchreqid = (cropId) => {
    axios
      .post(`/api/rolef/setEmptyFieldsRequest/${farmerId}/${cropId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('reqid = ', response.data);

        // Update the approvalStatus for the specific crop in the state
        const updatedCropDetails = cropDetails.map((crop) => {
          if (crop.cropId === cropId) {
            return {
              ...crop,
              approvalStatus: 'pending', // Change approval status to "pending"
            };
          }
          return crop;
        });

        setCropDetails(updatedCropDetails);
      })
      .catch((error) => {
        console.error('Error publishing crop:', error);
      });
  };

  const handlePublishClick = (cropId) => {
    axios
      .put(`/api/rolef/publish/${farmerId}/${cropId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Refresh the crop details after publishing
        fetchCropDetails();
      })
      .catch((error) => {
        console.error('Error publishing crop:', error);
      });
  };

  return (
    <div>
      <h2>Crop Details for Farmers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className='getcropdetailstable'  style={{ marginRight: '20px' }}>
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Crop Subtype</th>
                <th>Retail Price</th>
                <th>Wholesale Price</th>
                <th>Verify</th>
                <th>Approval Status</th>
                <th>Publishing</th>
              </tr>
            </thead>

            <tbody>
              {cropDetails.map((crop, index) => (
                <tr key={index}>
                  <td>{crop.cropName}</td>
                  <td>{crop.cropSubType}</td>
                  <td>{crop.cropRetailPrice}</td>
                  <td>{crop.cropWholesalePrice}</td>

                  <td>
                    
                    <button
                        className={`verify ${crop.approvalStatus === 'pending' ? 'disabled' : ''}`}
                        onClick={() => fetchreqid(crop.cropId)}
                        disabled={crop.approvalStatus === 'pending'} >
                    Verify
                   </button>

                  </td>

                  <td>{crop.approvalStatus}</td>

                  <td>
                    {/* <button
                      onClick={() => handlePublishClick(crop.cropId)}
                      disabled={crop.published}
                      style={{
                        backgroundColor: crop.published ? 'green' : 'red',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                      }}
                    >
                     
                    <button
                      className={`publish ${crop.published ? 'published' : ''}`}
                      onClick={() => handlePublishClick(crop.cropId)}
                      disabled={crop.published} >
                        {crop.published ? 'Published' : 'Publish'}
                    </button>

                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CropDetails;
*/

