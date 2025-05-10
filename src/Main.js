import {BrowserRouter as Router,Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom'
import LoginPage from "./LoginPage";
import RegistartionPage from "./RegistartionPage";
import TodoPage from "./Todopage";
import Home from './Home';
  
  function Main(){
    return(
        <Router>
        <div className="home-container"> 
            <div className="nav-links">
                {/* <NavLink to="/login" >Login</NavLink>
                <NavLink to="/register" >Register</NavLink> */}
            </div>

            <div>
            <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistartionPage />} />
                    <Route path="/todopage" element ={<TodoPage/>}></Route>
                    <Route path='*' element={<Home/>}></Route>
            </Routes>
            </div>
        </div>
    </Router>
    );
  }

  export default Main;