import './App.css';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import axios from 'axios';
import { cleanDetail } from './redux/actions';
import {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';

const URL = 'http://localhost:3001/login';

function App() {

  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [access, setAccess] = useState(false);

  useEffect(() => {
    return () => dispatch(cleanDetail())
 }, [dispatch])

  const login = async (userData) => {
    try {
      
      const { email, password } = userData;
      const {data} = await axios(URL + `?email=${email}&password=${password}`)
      const { access } = data;

      setAccess(access);
      access && navigate('/home');
    
    } catch (error) {
      return error.message
    }
  }

    useEffect(() => {
    !access && navigate('/')
    }, [access, navigate]);


  return (
    <div className="App">
    {location.pathname !== "/" && <Nav />}
    {location.pathname === "/home/createRecipe" && <CreateRecipe/>}
      <Routes>
        <Route path="/" element={<Form login={login} />}/>
        <Route path='/home' element={<Cards/>}/>
        <Route path='/home/search' element={""}/>
        <Route path='/home/filter' element={""}/>
        <Route path='/home/order' element={""}/>
        <Route path='/home/filterDb' element={""}/>
        <Route path='/home/createRecipe' element={""}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
  
}

export default App;