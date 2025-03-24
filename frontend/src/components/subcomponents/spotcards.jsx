import { Link } from "react-router-dom";

function SpotCards({ spot }) {
  
    const previewImage = spot.SpotImages && spot.SpotImages.length > 0 ? spot.SpotImages[0].url : '';

    return (
        <div>
            <Link to={`/spots/${spot.id}`} key={spot.id} className="spotItem">
                {previewImage && <img id="spotImage" src={previewImage} alt={spot.name} />}
            <div className="tooltip">{spot.name}</div>
                <div id="cardInfo">
                    <div id="location">
                        <p>{spot.city}, {spot.state}</p>
                    </div>
                    <div id="rating">
                       ⭐ {spot.avgRating || " New"} 
                    </div>
                </div>
                <p id="price">${spot.price} per night</p>
            </Link>
        </div>
    );
}

export default SpotCards;
