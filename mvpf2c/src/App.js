import {BrowserRouter ,Routes,Route} from 'react-router-dom';


// import ForgotPassword from './ForgotPassword';
// import ResetPassword from './ResetPassword';
import React from "react";
import AddFarmProduct from './AddFarmProduct';

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import VerifyPhoneno from './VerifyPhoneno';
import Enterotp from './EnterOtp';
import SignInOTP from './SignInOTP';
import LoginViaOtp from './LoginViaOTP';
import GetCropDetails from './GetCropDetails';
import FarmerDashboard from './FarmerDashboard';
import ConsumerDashboard from './ConsumerDashboard';
import QCDashboard from './QCDashboard';
import CCDashboard from './CCDashboard';
import './App.css'
import CCviewFReqlist from './CCviewFReqlist';
import QualityCheckerList from './QualityCheckerList';
import CCassignQCtoF from './CCassignQCtoF';

import  QCViewFReqList from './QCViewFReqList';
import CCviewFReqSingle from './CCviewFReqSingle';
import QCViewFReqSingle from './QCViewFReqSingle';
import CCviewQCFreeLoc from './CCviewQCFreeLoc';


//import CropDetails from './GetCropDetails';
import ConsumerDashpage from './ConsumerDashpage'; //Crop List using List of getCropDetails() from Spring
import ViewSingleCrop from './ViewSingleCrop';
import ConsumerCart from './ConsumerCart';
import ConsumerOrder from './ConsumerOrder';
//dashboard
//import FarmerDashboard from './FarmerDashboard';


//import AdminDashboard from './AdminDashboard';
import PaymentForm from './Payment';
import UpdateFarmProduct from './UpdateFarmProduct'
import Logout from './Logout';

// import ViewFtoCCRequests from './ViewFtoCCRequests';
// import ConsumerDashboard from './ConsumerDashboard';
// import CropDetails from './ConsumerDashboard';
//import ConsumerDashboard from './ConsumerDashboard';
function App() {
 

  
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/signup' element={<SignupForm/>}></Route>
      <Route path='/signin' element={<SigninForm/>}></Route>
 
      <Route path='/loginviaotp' element={<LoginViaOtp/>}></Route>
      <Route path='/enterotp' element={<Enterotp/>}></Route>

      <Route path='/verifyphone' element={<VerifyPhoneno/>}></Route>
      <Route path='/signinviaotp' element={<SignInOTP/>}></Route>

      <Route path='/addcrop' element={<AddFarmProduct/>}></Route>
      <Route path='/getcroplist' element={<GetCropDetails/>}></Route>
      <Route path='/editCrop/:cropId' element={<UpdateFarmProduct/>}></Route>

      <Route path="/logout" element={<Logout/>}/>
    
      {/* Call Center Admin */}    
      <Route path="/CCviewFReqlist" element={<CCviewFReqlist />} />
      <Route path="/CCviewFReqSingle/:farmerId/:requestId" element={<CCviewFReqSingle />} />
      <Route path="/CCviewQCFreeLoc/:requestId" element={<CCviewQCFreeLoc />} />
      <Route path="/CCassignQCtoF" element={<CCassignQCtoF/>}/>         
      <Route path="/allqc" element={<QualityCheckerList/>}/>
         
      <Route path="/QCViewFReqList" element={<QCViewFReqList/>}/>
      <Route path="/QCviewFReqSingle/:requestId" element={<QCViewFReqSingle/>} />
        
          {/* consumer */}
         <Route path='/crops' element={<ConsumerDashpage/>}></Route>
         <Route path="/ViewSingleCrop/:consumerId/:cropId" element={<ViewSingleCrop/>} />
         <Route path="/consumerCart/:consumerId" element={<ConsumerCart/>} />
         <Route path="/ConsumerOrder/:consumerId/:orderId" element={<ConsumerOrder/>} />
         <Route path='/myOrders' element={<ConsumerOrder/>}></Route>
         <Route path="/payment" element={<PaymentForm/>}></Route>
         
{/* Dashboards */}
<Route path="/farmerdashboard" element={<FarmerDashboard/>}/>
<Route path="/consumerdashboard" element={<ConsumerDashboard/>}/>
<Route path="/qcdashboard" element={<QCDashboard/>}/>
<Route path="/ccdashboard" element={<CCDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
