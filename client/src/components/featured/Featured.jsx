import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {

    const { data, loading, error } = useFetch('http://localhost:8000/api/countByCity?cities=athens,vlore,berlin')

    return (
        <div className="featured">
            {loading ? 'Loading please wait': <><div className="featuredItem">
                <img
                    src="https://cdn.britannica.com/61/179661-138-6F13E02A/Overview-Athens.jpg?w=800&h=450&c=crop"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Athens</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img
                    src="https://www.seatemperatu.re/site/images/illustration/vlore.jpg"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Vlore</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img
                    src="https://www.telegraph.co.uk/content/dam/Travel/leadAssets/31/06/berlin_3106509a.jpg?imwidth=680"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Berlin</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div></>}
        </div>
    );
};

export default Featured;