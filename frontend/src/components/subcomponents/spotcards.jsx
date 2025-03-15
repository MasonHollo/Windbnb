import { Link } from "react-router-dom"

function spotcards(spot){
    return (
        <div>
        <Link to={`/spots/${spot.id}`} key={spot.id} className="spotItem">
            <h3>{spot.name}</h3>
            <img id='spotImage' src={spot.previewImage} alt={spot.name} />
            <p>{spot.city}, {spot.state}, ⭐{spot.avgRating}</p>
            <p>${spot.price} per night</p>
          
        </Link>
        </div>
    )
}

export default spotcards