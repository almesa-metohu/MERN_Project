import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import "./register.css";

const Register = () => {

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [validation, setValidation] = useState({})

    const register = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8000/api/register',
                { firstName, lastName, email, city, country, phone, password, confirmPassword },
                { withCredentials: true }
            )
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('userId',response.data.user._id)
                navigate('/')
            }
        }
        catch (error) {
            setValidation(error.response.data.errors);
        }
    }

    return (
        <div className='d-flex justify-content-between'> 
            <img src='https://i.ibb.co/KzbnkC1/Boo-Clo-2.png'/>
            <form onSubmit={register} className="register">
                <div className="lContainer">
                <h2 className='h2text'>Sign Up!</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="lInput"
                    />
                    {validation.firstName ? <span className='validation'>{validation.firstName.message}</span> : ""}
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="lInput"
                    />
                    {validation.lastName ? <span className='validation'>{validation.lastName.message}</span> : ""}
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="lInput"
                    />
                    {validation.email ? <span className='validation'>{validation.email.message}</span> : ""}
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="lInput"
                    />
                    {validation.city ? <span className='validation'>{validation.city.message}</span> : ""}
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="lInput"
                    />
                    {validation.country ? <span className='validation'>{validation.country.message}</span> : ""}
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="lInput"
                    />
                    {validation.phone ? <span className='validation'>{validation.phone.message}</span> : ""}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="lInput"
                    />
                    {validation.password ? <span className='validation'>{validation.password.message}</span> : ""}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="lInput"
                    />
                    {validation.confirmPassword ? <span className='validation'>{validation.confirmPassword.message}</span> : ""}
                    <button type='submit' className="lButton">
                        Register
                    </button>
                    <p>Already registered? <Link to={'/login'}>Sign In</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register;