import { lazy,Suspense  } from 'react';
import Login from './page/Login'
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom';
import Register from './page/Register/register';
import Dashboard from './page/Dashboard';
import GetSponsor from './page/GetSponsor ';
import ProductDashboard from './page/Product/ProductDashboard';
import GetCoach from './page/GetCoach';
import Navbarr from './Components/Navbar/navbar';
import Loader from './Components/Loader';
import Home from './page/Home/home';
import  { useEffect, useState } from "react";
import UpdateUser from './page/Modifyaccount/updateUser'
import UpdateCoach from './page/Modifyaccount/updateCoach'
import UpdateSponsor from './page/Modifyaccount/updateSponsor'
import { useDispatch , useSelector , } from "react-redux";
import axios from "axios";
import UserDashboard from './page/UserDashboard/UserDashboard';
import ProductDetail from './page/ProductDetail/ProductDetail';
import Shop from './page/Shop/shop';

import {client} from './apollo.js'
import { ApolloProvider } from '@apollo/client';
import Project from './Components/Project/Project';
import Getallprojects from './Components/Project/Getallprojects';
import Addproject from './Components/Project/Addproject';
import Updateproject from './Components/Project/Updateproject';
import Getallevents from './Components/Eve/Getallevents';
import Event from './Components/Eve/Event';
import Updateevent from './Components/Eve/Updateevent';
import Addevent from './Components/Eve/Addevent';


const ForgetPassword =lazy(() => import('./page/ForgetPassword'));
const ResetPassword = lazy(()=>import('./page/ResetPassword'))
const Profile = lazy(()=>import('./page/Profile'))

function App() {
  const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const isAdmin = localStorage.getItem('adminRole') === 'true';

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `http://localhost:5000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
		}
	};

	useEffect(() => {
		getUser();
	}, []);


  return (
    <ApolloProvider client={client}>
    <Suspense fallback={<Loader />}>
    <Router>
    {isAdmin ? (
    <Routes> 
    <Route path="/login" element={<> <Navbarr /> <Login/> </>} />
    <Route path="/register" element={<> <Navbarr /> <Register/> </>} />     
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/forget-password" element={<><Navbarr /> <ForgetPassword/> </>} />
    <Route path="/reset-password" element={<><Navbarr /><ResetPassword/> </>} />
    <Route path="/profile" element={<><Navbarr /> <Profile/> </>} />
    <Route path="/" element={<><Navbarr /> <Home/> </>} />
    <Route exact  path="/sponsor/:id" element={ <GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />
    <Route path="/verify-email/:emailToken" element={<><Navbarr /><Login/> </>} />
    <Route path="/productdetail/:id">
  <Navbarr />
  <ProductDetail />
</Route>
    



    </Routes>
    
      
      ):(<Routes>
        <Route path="/login" element={<> <Navbarr /> <Login/></>} />
    <Route path="/register" element={<> <Navbarr /><Register/> </>} />     
    <Route path="/forget-password" element={ <> <Navbarr /><ForgetPassword/> </> } />
    <Route path="/reset-password" element={<> <Navbarr /> <ResetPassword/></>} />

   
    <Route path="/profile" element={<>   <Navbarr /> <Profile/>  </> } />


    <Route path="/project" element={<>   <Navbarr /> <Project/>  </> } />
    <Route path="/projects" element={<>    <Navbarr /> <Getallprojects/>  </> } />
    <Route path="/addproject" element={<>   <Navbarr /> <Addproject/>  </> } />
    <Route path="/updateproject/:id" element={<>   <Navbarr /> <Updateproject/>  </> } />



    <Route path="/events" element={<>  <Navbarr />  <Getallevents/>  </> } />
    <Route path="/event" element={<>   <Navbarr /> <Event/>  </> } />
    <Route path="/addevent" element={<> <Navbarr />   <Addevent/>  </> } />
    <Route path="/updateevent/:id" element={<> <Navbarr />   <Updateevent/>  </> } />


  

    <Route path="/" element={<><Navbarr /><Home/></>} />
    <Route path="/productdetail/:id" element={<> <div className="bgdetail"><Navbarr /><ProductDetail/></div></>} />
    <Route path="/shop" element={<><Navbarr /><Shop/></>} />

    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/userupdate" element={<> <Navbarr /> <UpdateUser /> </> } /> 
    <Route exact  path="/sponsor/:id" element={ <GetSponsor/>} />
    <Route exact  path="/coach/:id" element={<GetCoach/>} />
    <Route path="/coachupdate" element={<> <Navbarr /> <UpdateCoach></UpdateCoach> </>} />
    <Route path="/spnsorupdate" element={<> <Navbarr /> <UpdateSponsor></UpdateSponsor> </>} />
    <Route path="/userdashboard" element={<><div className='yo'><Navbarr /> <UserDashboard></UserDashboard></div></> } /> 
    <Route path="/productdashboard" element={<ProductDashboard/>} />
 
    <Route path="/verify-email/:emailToken" element={<><Navbarr /> <Login/> </>} />
        </Routes>)}
    </Router>
    
    </Suspense>
    </ApolloProvider>
  );
}

export default App;
