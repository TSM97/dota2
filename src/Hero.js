import {useLocation}  from 'react-router-dom'
import {useContext, useState, useEffect} from 'react'
import './Hero.css';
import {MyContext} from './MyContext'


function Hero(){

    const {state} = useLocation()
    const [data,setData] = useState([])
    const {id,img,localized_name,primary_attr,rest}= state
    const  {isOn}  = useContext(MyContext);

    useEffect( () => {
        const fetchData = async () => {
            const json = await fetch(`https://api.opendota.com/api/heroes/1/itemPopularity`)
            const data = await json.json()
            // const newDataS= Object.entries(data.start_game_items).map((el)=>{return ({timing:'start_game_items',id:el[0],curr:el[1]})})
            setData(data)
          } 
        fetchData().catch(console.error)
     },[])

     console.log(data)

    function calculateBaseAtt(){
        if(primary_attr==='str') return `${rest.base_attack_min+rest.base_str} - ${rest.base_attack_max+rest.base_str}`
        else if(primary_attr==='agi') return `${rest.base_attack_min+rest.base_agi} - ${rest.base_attack_max+rest.base_agi}`
        else if (primary_attr==='int')  return `${rest.base_attack_min+rest.base_int} - ${rest.base_attack_max+rest.base_int}`
    }
    function calculateBaseArmor(){
        if(primary_attr==='str') return (((rest.base_str/6)+rest.base_armor).toFixed(1))
        else if(primary_attr==='agi') return (((rest.base_agi/6)+rest.base_armor).toFixed(1))
        else if (primary_attr==='int')  return (((rest.base_int/6)+rest.base_armor).toFixed(1))
    }

    function light(name){return (isOn? `${name} ${name}On` : name)}


    return(
        <div className='Page'>
        <div className="Body">
         <h1 className={`h1_${primary_attr}`}>{localized_name}</h1>
         <div className={light('statsS')}>{rest.roles.map((el)=> (` ${el} `))}</div>
         <div className="hero">
                <div className={`heroNext_${primary_attr}`}>
                   <img className='heroIcon' key={id} src={`http://api.opendota.com${img}`} alt={localized_name}/>
                   <div>
                      <div className={light('statsS')}> DMG: {calculateBaseAtt()}</div>
                      <div className={light('statsS')}>Range: {rest.attack_range}</div>
                      <div className={light('statsS')}> Attack Rate: {rest.attack_rate}</div>
                      <div className={light('statsS')}>Projectile: {rest.projectile_speed}</div>
                   </div>
                   <div>
                   <div className={light('statsS')}>MV speed: {rest.move_speed}</div>
                      <div className={light('statsS')}>Base Armor: {calculateBaseArmor()}</div>
                      <div className={light('statsS')}>Magic Res: 25%</div>
                   </div>
                </div>
                <div className='healthBar'>{rest.base_str*20+rest.base_health}</div>
                <div className='manaBar'>{rest.base_int*12+rest.base_mana}</div>
                <div className={light('attributesGrid')}>
                    <img  className='icon'  src={require('./Icons/str.png')} alt='str'/>  
                    <div>{rest.base_str}</div><div>+{rest.str_gain}</div>                 
                    <img  className='icon'  src={require('./Icons/agi.png')} alt='str'/>  
                    <div>{rest.base_agi}</div><div>+{rest.agi_gain}</div>                           
                    <img  className='icon'  src={require('./Icons/int.png')} alt='str'/>
                    <div>{rest.base_int}</div><div>+{rest.int_gain}</div>                
                </div>

            </div>
        </div>
        </div>
    )
}

export default Hero