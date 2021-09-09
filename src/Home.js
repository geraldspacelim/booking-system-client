import SeatList from './SeatList';
import './index.css';
import Create from './Create';
import { useEffect, useState } from 'react';
import Legend from './Assets/legend.png'
const axios = require('axios');


const Home = () => {

    const [seats, setSeats] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        findAllSeats()
    }, [])

    function findAllSeats() {
        axios.get(`http://localhost:8001/api/v1/findAllSeats`)
        .then(res => {
            if(res.status == 200) {
                setSeats(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    return ( 
        <div className="home">
            <div className="loader" hidden={isLoading}></div>
            <div className="overlay" hidden={isLoading}></div>
            <div className="split left">
                <div className="container">
                    <div className="screen"></div>
                    {seats && <SeatList seats={seats} findAllSeats={findAllSeats} setSelectedSeat={setSelectedSeat}/>}
                    <img src={Legend} alt=""/>
                </div>
            </div>
            <div className="split right">
                <Create selectedSeat={selectedSeat} findAllSeats={findAllSeats} setSelectedSeat={setSelectedSeat} setIsLoading={setIsLoading}/>
            </div>
            
        </div>
        
     );
}
 
export default Home;