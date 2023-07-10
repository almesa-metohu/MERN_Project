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
        <div className={data.isAdmin ? 'navbarAdmin' : 'navbar'}>
            <div className={data.isAdmin ? 'navContainerAdmin' : 'navContainer'}>
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}><span className='logo h4'>BooClo</span></Link>
                {userId && data.isAdmin ? <strong className='userNameAdmin'>{data.firstName}<p style={{ fontSize: '10px', color: 'red'}}>Admin View</p></strong> : userId ?
                        <div className="dropdown">
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                            {data.profilePhoto ? <img src={data.profilePhoto} alt="" width="50" height="50" class="rounded-circle me-2"/> : <img src="https://i.ibb.co/vY5LXmw/image.png" alt="" width="50" height="50" className="rounded-circle me-2" />}
                                <strong className='userName'>{data.firstName}</strong>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                <li><button className="dropdown-item">Edit Profile</button></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button onClick={logout} className="dropdown-item" href="#">Sign out</button></li>
                            </ul>
                            
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