import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './addRoom.css'

const AddRoom = ({ closeModalNew, socket }) => {

    const [roomType, setRoomType] = useState('')
    const [price, setPrice] = useState('')
    const [capacity, setCapacity] = useState('')
    const [roomNumbers, setRoomNumbers] = useState('')
    const [error, setError] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/newHotel', {
            roomType,
            price,
            capacity,
            roomNumbers
        }, { withCredentials: true })
        .then((res) => {
            socket.emit('toServer', res.data)
            console.log("Added")})
        .catch(error => {
            console.log(error)
            setError(error.response.data.errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="add-room">
            <div>
                <br/>
                <div className="d-flex justify-content-evenly">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Room Type:</label>
                            <input
                                id="room-type"
                                type="text"
                                onChange={(e) => setRoomType(e.target.value)}
                            />
                            {error.roomType ? <p style={{ color: 'red', fontSize: '10px' }}>{error.roomType.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Price</label>
                            <input
                                type="number"
                                id="price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            {error.price ? <p style={{ color: 'red', fontSize: '10px' }}>{error.price.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-evenly">
                <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="email">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                            {error.capacity ? <p style={{ color: 'red', fontSize: '10px' }}>{error.capacity.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Room Numbers:</label>
                            <input
                                type="number"
                                id="room-numbers"
                                onChange={(e) => setRoomType(e.target.value)}
                            />
                            {error.cheapestPrice ? <p style={{ color: 'red', fontSize: '10px' }}>{error.cheapestPrice.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br />
                {/* <div className="d-flex justify-content-between">
                <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="phone">Address:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                id="address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {error.address ? <p style={{ color: 'red', fontSize: '10px' }}>{error.address.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {error.city ? <p style={{ color: 'red', fontSize: '10px' }}>{error.city.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="country">Country:</label>
                            <input
                                type="text"
                                id="country"
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            {error.country ? <p style={{ color: 'red', fontSize: '10px' }}>{error.country.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <div className="label-input-container">
                        <label htmlFor="hotelDescription">Description:</label>
                        <textarea
                            id="hotelDescription"
                            rows={3}
                            cols={50}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {error.description ? <p style={{ color: 'red', fontSize: '10px'}}>{error.description.message}</p> : ''}                        
                    </div>
                </div> */}
                <button type="submit" className="rButton" >
                    Create Room
                </button>
            </div>
        </div>
    </form>
    )
}

export default AddRoom