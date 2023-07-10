import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import './hotel.css'
import axios from "axios";
import HotelDetails from "../hotelDetails/HotelDetails";

const Hotels = () => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const { data, loading, error } = useFetch(`http://localhost:8000/api/allListings`)

    const viewHotel = (hotel) => {
        setSelectedHotel(hotel)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false);
    };

    const deleteHotel = (hotelId) => {
        axios.delete(`http://localhost:8000/api/deleteHotel/${hotelId}`, { withCredentials: true })
            .then(() => console.log('hotel deleted'))
            .catch((err) => console.log('error deleting hotel' + err))
    }

    const addHotel = (hotelId) => {

    }

    return (
        <div className="hotels-container">
            <div className="d-flex justify-content-between">
                <h3 style={{ color: '#417D7A' }}>Add a new hotel</h3>
                <button className="btn" style={{ border: '1px solid #417D7A', color: '#417D7A' }} onClick={addHotel}>Add New</button>
            </div>
            <br />
            <table className="table col-sm-6 table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">Hotel</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Country</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr>
                        <td colSpan={4}>Loading...</td>
                    </tr> : <>{data.map((hotel, index) => (
                        <tr key={index}>
                            <td><img src='' alt="" style={{ width: '50px', height: '50px' }} /> &nbsp;&nbsp;
                                {hotel.name}</td>
                            <td>{hotel.address}, {hotel.city}</td>
                            <td>{hotel.country}</td>
                            <td className="d-flex justify-content-around">
                                <button className="btn btn-success" onClick={() => viewHotel(hotel)}>View</button>
                                <button className="btn btn-danger" onClick={() => deleteHotel(hotel._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </>}
                </tbody>
            </table>
            {openModal && (
                    <HotelDetails
                        hotel={selectedHotel}
                        closeModal={closeModal}
                    />
                )}
        </div>
    )
}

export default Hotels