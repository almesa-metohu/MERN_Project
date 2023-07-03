import "./navbar.css"
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}><span className="logo h4">BooClo</span></Link>
                <div className="navItems">
                    <button className="navButton btn btn-light" onClick={() => {navigate('/register')}}>Register</button>
                    <button className="navButton btn btn-light" onClick={() => {navigate('/login')}}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar