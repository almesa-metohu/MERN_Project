import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './adduser.css'

const AddUser = ({ closeModalNew, socket }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register',
            {
                firstName,
                lastName,
                email,
                profilePhoto,
                city,
                country,
                phone,
                password,
                confirmPassword
            }, { withCredentials: true }
        )
            .then((res) => {
                socket.emit('toServer', res.data)
                console.log("Added")})
            .catch(error => {
                console.log(error)
                setError(error.response.data.error)
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
                <div className="d-flex">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {error.firstName ? <p style={{ color: 'red', fontSize: '10px' }}>{error.firstName.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {error.lastName ? <p style={{ color: 'red', fontSize: '10px' }}>{error.lastName.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="email">Email:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error.email ? <p style={{ color: 'red', fontSize: '10px' }}>{error.email.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                id="phone"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {error.phone ? <p style={{ color: 'red', fontSize: '10px' }}>{error.phone.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Profile Photo URL:</label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => setProfilePhoto(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="d-flex justify-content-center">
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
                <br />
                <div className="d-flex justify-content-center">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="city">Password:</label>
                            <input
                                type="password"
                                id="pass"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error.password ? <p style={{ color: 'red', fontSize: '10px' }}>{error.password.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="country">Confirm Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {error.confirmPassword ? <p style={{ color: 'red', fontSize: '10px' }}>{error.confirmPassword.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br />
                <button type="submit" className="rButton" >
                    Create User
                </button>
            </div>
        </div>
    </form>
)
}
export default AddUser;

