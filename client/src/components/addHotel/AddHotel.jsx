import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './addHotel.css'

const AddHotel = ({ closeModalNew, socket }) => {

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')
    const [cheapestPrice, setCheapestPrice] = useState('')
    const [error, setError] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/newHotel', {
            name,
            city,
            country,
            address,
            distance,
            description,
            photo,
            cheapestPrice
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
        <div className="add-user">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={closeModalNew}
                />
                <br/>
                <div className="d-flex justify-content-evenly">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Hotel Name:</label>
                            <input
                                id="name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                            {error.name ? <p style={{ color: 'red', fontSize: '10px' }}>{error.name.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Hotel Photo URL:</label>
                            <input
                                type="text"
                                id="photo"
                                onChange={(e) => setPhoto(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-evenly">
                <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="email">Distance from city center:</label>
                            <input
                                type="number"
                                id="distanceCity"
                                onChange={(e) => setDistance(e.target.value)}
                            />
                            {error.distance ? <p style={{ color: 'red', fontSize: '10px' }}>{error.distance.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Cheapest Price Room:</label>
                            <input
                                type="number"
                                id="price"
                                onChange={(e) => setCheapestPrice(e.target.value)}
                            />
                            {error.cheapestPrice ? <p style={{ color: 'red', fontSize: '10px' }}>{error.cheapestPrice.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br />
                <div className="d-flex justify-content-between">
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
                </div>
                <br />
                <button type="submit" className="rButton" >
                    Create Hotel
                </button>
            </div>
        </div>
    </form>
    )
}

export default AddHotel