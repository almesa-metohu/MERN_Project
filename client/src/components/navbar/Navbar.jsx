import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react"

const Navbar = () => {

    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [data, setData] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userId}`)
            .then(user => setData(user.data))
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: 'same-origin'})
            .then(() => {
                console.log('logging out')
                localStorage.removeItem('userId');
                navigate('/')
            })
            .catch(err => console.log(err.data))
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}><span className="logo h4">BooClo</span></Link>
                {userId ?
                    <div className="d-flex">
                        {data.profilePhoto ? <img className="photoAvatar" src={data.profilePhoto} /> : <img className="photoAvatar" src="https://i.ibb.co/vY5LXmw/image.png" />}
                        <p className="userName">{data.firstName}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-danger" onClick={logout}>Log Out</button>
                    </div>
                        :
                    <div className="navItems">
                        <button className="navButton btn btn-light" onClick={() => { navigate('/register') }}>Register</button>
                        <button className="navButton btn btn-light" onClick={() => { navigate('/login') }}>Login</button>
                    </div>}

            </div>
        </div>
    )
}

export default Navbar;