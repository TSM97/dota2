import './App.css';
import './Body.css';
import Body from './Body.js'
import Hero from './Hero.js'
import { BrowserRouter as Router, Route , Routes, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { MyContext } from "./MyContext";

const LOCAL_STORAGE_KEY = 'dota2App'
const URL_ITEMS='https://api.opendota.com/api/constants/'

function App() {

  const [isOn, setIsOn]= useState(false)
  const [item, setItem]= useState([])


  useEffect(()=>{
    const storedIsOn = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedIsOn)setIsOn(storedIsOn)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isOn))
  },[isOn])

  useEffect( () => {
    const fetchData = async () => {
        const json = await fetch(`${URL_ITEMS}items`)
        const data = await json.json()
        setItem(data)
      } 
    fetchData().catch(console.error)
 },[])

  isOn ? document.body.className='body bodyOn': document.body.className='body'

  return (
    <MyContext.Provider value={{isOn,item}}>
    <Router>
     <div className="App">
     <div className='navBar'>
       <Link to="/">
         <img className="dota2Icon" src={require('./Icons/dota2Icon.svg').default} alt='dota2Icon' />
       </Link>
       <img onClick={()=>setIsOn(!isOn)} className={isOn ? 'light lightOn': 'light'} src={require('./Icons/light.png')} alt='dota2Icon' />
         </div>
       <Routes>
         <Route exact path="/" element={<Body />} />
         <Route path="/Hero" element={<Hero />} />
       </Routes>
     </div>
    </Router>
    </MyContext.Provider>

  );
}

export default App;
