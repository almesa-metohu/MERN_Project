import "./navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">BooClo</span>
                <div className="navItems">
                    <button className="navButton btn btn-light">Register</button>
                    <button className="navButton btn btn-light">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar