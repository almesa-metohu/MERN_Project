import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import axios from "axios";

const Home = () => {

    const [user, setUser] = useState('')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userId}`)
            .then(user => setUser(user.data))
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            <Navbar/>
            {user.isAdmin ? <></> : <><Header/>
                <div className="homeContainer">
                    <Featured/>
                    <h1 className="homeTitle">Homes guests love</h1>
                    <FeaturedProperties/>
                    <MailList/>
                    <Footer/>
                </div></>}
        </div>
    );
};

export default Home;