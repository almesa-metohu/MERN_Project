import "./featuredProperties.css";
import useFetch from "../hooks/useFetch";

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch('http://localhost:8000/api/allListings?featured=true')

    return (
        <div className="fp">
            {loading ? 'Loading...' : 
            <>
            {data.map((item,index) => (
                <div className="fpItem" key={index}>
                <img
                    src={item.photos}
                    alt="hotel photo"
                    className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.location}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {item.ratings ? <div className="fpRating">
                    <button>{item.ratings}</button>
                    <span>Excellent</span>
                </div> : ""}
            </div>
            ))}
            </>
            }
        </div>
    );
};

export default FeaturedProperties;