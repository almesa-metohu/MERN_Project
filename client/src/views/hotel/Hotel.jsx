import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/reserve/Reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../components/context/SearchContext";

const Hotel = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const { data, loading, error } = useFetch(`http://localhost:8000/api/hotel/${id}`)
    const { dates, options } = useContext(SearchContext)
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const bookHotel = () => {
        userId ? setOpenModal(true) : navigate('/register')
    }


    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? 'loading...' : <div className="hotelContainer">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="close"
                            onClick={() => setOpen(false)}
                        />
                    </div>
                )}
                <div className="hotelWrapper">
                    <button className="bookNow" onClick={bookHotel}>Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}, {data.city}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location – {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <p className="hotelDesc">{data.description}</p>
                    <div className="hotelImages">
                        <img src={data.photo}/>
                    </div>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                            </h2>
                            <button onClick={bookHotel}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
            }
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
        </div>
    );
};

export default Hotel;