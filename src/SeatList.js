import './index.css';
import { useState } from 'react';
const axios = require('axios');

const SeatList = ({seats, findAllSeats, setSelectedSeat}) => { 
    const [isSelected, setIsSelected] = useState("")

    const selectSeat = (seat) => {
        // if seat is already taken, users are unable to select the seat
        if (seat[2]) {
            alert("Seat is already taken!")
            return
        } 
        // whenever a user selects a seat, system will check for seat availablity 
        checkSeatStatus(seat[1]) 
    }

    function checkSeatStatus(id) {
        axios.get(`http://209.97.175.18:8001/api/v1/isBooked/${id}`)
            .then(res => {
                // console.log(res)
                if (res.status == 200) {
                    if (res.data.data) {
                        alert(`Seat ${id} is already taken`)
                        // is seat is taken, update status of all seats
                        findAllSeats()
                    } else {
                        // if seat is empty, set the seat to selected colour 
                        setSelectedSeat(id)
                        setIsSelected(id)
                    }
                }
            }).catch(err => {
                console.log(err.response)
                if (err.response.status == 429) {
                    alert(err.response.data.message)
                }
            })
    }

    return ( 
        <div className="seats-list">
             {seats.data.map((seat) => (
               <div className="seat" 
                    key={seat[0]} 
                    style={{backgroundColor: seat[2] ? '#FFFFFF' : (isSelected == seat[1] ? '#6FEAF6' :  '#444451')}}
                    onClick={() => selectSeat(seat)}
               /> 
           ))}
        </div>
     );
}
 
export default SeatList;