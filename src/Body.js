import {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import './Body.css'
import Skeleton from './Skeleton.js'
import {MyContext} from './MyContext'

const URL = 'https://api.opendota.com/api/heroStats';

function Body(){

   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const navigate= useNavigate()
   const  {isOn}  = useContext(MyContext);

 useEffect( () => {
    const fetchData = async () => {
        const json = await fetch(URL)
        const data = await json.json()
        setData(data)
        setLoading(false)
      } 
    fetchData().catch(console.error)
 },[])

 console.log(data)
  function chooseSpace(attr,primary_attr,img,id,localized_name,rest){
   if(primary_attr===attr) return(<img onClick={()=>navigate('/Hero',{state:{id, img, localized_name, primary_attr, rest}})} className="iconImages" key={id} src={`http://api.opendota.com${img}`} alt={localized_name}/>)
  }

 return (
    <div className="heroesContainer">
      <div className={isOn ? "tab tabOn" : 'tab'}>
         <div className='attrWord'>agility</div>
         {loading && <Skeleton />}
         {!loading && (data.map(({id,img,primary_attr,localized_name,...rest})=> chooseSpace('agi',primary_attr,img,id,localized_name,rest)))}
      </div>
      <div className={isOn ? "tab tabOn" : 'tab'}>
         <div className='attrWord'>strength</div>
         {loading && <Skeleton />}
         {!loading && data.map(({id,img,primary_attr,localized_name,...rest})=> chooseSpace('str',primary_attr,img,id,localized_name,rest))}
      </div>
      <div className={isOn ? "tab tabOn" : 'tab'}>
         <div className='attrWord'>inteligence</div>
         {loading && <Skeleton />}
         {!loading && data.map(({id,img,primary_attr,localized_name,...rest})=> chooseSpace('int',primary_attr,img,id,localized_name,rest))}
      </div>
    </div>
 )
}

export default Body