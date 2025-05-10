import LoginPage from "./LoginPage";
import RegistartionPage from "./RegistartionPage";
import {BrowserRouter as Router,Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom'
import './Home.css'
import TodoPage from "./Todopage";
function Home() {

  

    return(
        <div className="home-container"> 
            <h1>Welcome To To-Do App</h1>
            <p className="home-subtext">Manage your daily tasks efficiently and stay organized!</p>
            <div className="nav-links">
                <NavLink to="/login" >Login</NavLink>
                <NavLink to="/register" >Register</NavLink>
            </div>

            <div>
            <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistartionPage />} />
                    <Route path="/todopage/*" element ={<TodoPage/>}></Route>
            </Routes>
            </div>
        </div>
  
    );
}

export default Home;