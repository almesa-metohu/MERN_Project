import { useState } from "react"
import "./mailList.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MailList = () => {

    const [submitedEmail, setSubmitedEmail] = useState('')
    const navigate = useNavigate()

    const submitEmail = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/subscriptionEmail`, { 
            submitedEmail 
        })
        .then(() => console.log('Subscription e-mail sent successfully'))
        .catch(err => console.log('error sending subscription email', err))
        setSubmitedEmail('')
        navigate('/')
    }

    return (
        <div className="mail">
            <h1 className="mailTitle">Save time, save money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you</span>
            <form className="mailInputContainer" onSubmit={submitEmail}>
                <input type="text" placeholder="Your Email" value={submitedEmail} onChange={(e) => setSubmitedEmail(e.target.value)}/>
                <button type="submit">Subscribe</button>
            </form>
        </div>
    )
}

export default MailList