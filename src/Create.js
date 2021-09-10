import axios from "axios";
import { useState } from "react";
import './index.css';



const Create = ({selectedSeat, findAllSeats, setSelectedSeat, setIsLoading}) => 
{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedSeat == "") {
            alert("Please select a seat")
            return
        }
        const booking = {
            first_name: firstName, 
            last_name: lastName, 
            email: email, 
            seat_number: selectedSeat
        }
        setIsLoading(false)
        axios.put(" https://ocbc-booking-system-springboot.herokuapp.com/api/v1/bookSeat", booking)
            .then(res => {
                if (res.status == 200) {
                    sendConfirmationEmail(booking)                 
                } 
            }).catch(err => {
                if (err.response.status == 409 || err.response.status == 400) {
                    alert(err.response.data.message)
                    setIsLoading(true)
                    setSelectedSeat("")
                    findAllSeats()
                }
            })
    }

    function sendConfirmationEmail(booking) {
        axios.post(" https://ocbc-booking-system-springboot.herokuapp.com/api/v1/sendConfirmationEmail", booking)
            .then(res => {
                if (res.status = 200) {
                    alert(`Booking Successful! ${res.data.message}`)
                    setIsLoading(true)
                    setSelectedSeat("")
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    findAllSeats()
                } 
            }).catch (err => {
                console.log(err)
            })
    }

    return (
        <div className="create">
            <h2>Book a seat</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name: </label>
                <input 
                    type="text" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last Name </label>
                <input 
                    type="text" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Seat Number: </label>
                <input 
                    className="seat-number"
                    style={{fontWeight: "bold"}}
                    type="text" 
                    required
                    value={selectedSeat}
                    readOnly
                />
                 <label>Email: </label>
                <input 
                    type="eamil " 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button>Confirm Booking</button>
            </form>
        </div>
    )
}

export default Create;