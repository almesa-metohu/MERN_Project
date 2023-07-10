import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./userDetails.css";
import axios from "axios";

const UserDetails = ({ user, closeModal }) => {

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [city, setCity] = useState(user.city)
    const [country, setCountry] = useState(user.country)
    const [phone, setPhone] = useState(user.phone)
    const [error, setError] = useState('')

    const updateUser = () => {
        axios.patch(`http://localhost:8000/api/user/${user._id}`, {
            firstName,
            lastName,
            email,
            city,
            country,
            phone
        }, { withCredentials: true })
        .then(user => console.log(user))
        .catch(err => {
          console.log(err)
          setError(err.response.data.error)
        })
    }

    return (
      <div className="userInfo">
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={closeModal}
          />
          <br />
          <div className="d-flex">
            <div className="form-group">
              <div className="label-input-container">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName ? <p style={{ color: 'red', fontSize: '10px' }}>{error.lastName.message}</p> : ''}
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="label-input-container">
              <label htmlFor="email">Email:</label>
              <input
                style={{ width: '100%' }}
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email ? <p style={{ color: 'red', fontSize: '10px' }}>{error.email.message}</p> : ''}
            </div>
          </div>
          <br />
          <div className="d-flex">
            <div className="form-group">
              <div className="label-input-container">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {error.country ? <p style={{ color: 'red', fontSize: '10px' }}>{error.country.message}</p> : ''}
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="label-input-container">
              <label htmlFor="phone">Phone:</label>
              <input
                style={{ width: '100%' }}
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {error.phone ? <p style={{ color: 'red', fontSize: '10px' }}>{error.phone.message}</p> : ''}
            </div>
          </div>
          <button className="rButton" onClick={updateUser}>
            Update User
          </button>
        </div>
      </div>

    );
}

export default UserDetails;
