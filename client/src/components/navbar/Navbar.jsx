import "./navbar.css"
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}><span className="logo">BooClo</span></Link>
                <div className="navItems">
                    <button className="navButton btn btn-light">Register</button>
                    <button className="navButton btn btn-light">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar