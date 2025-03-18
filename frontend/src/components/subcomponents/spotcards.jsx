import { Link } from "react-router-dom"

function SpotCards({ spot }) {
    return (
        <div>
            <Link to={`/spots/${spot.id}`} key={spot.id} class="spotItem" >

                <img id="spotImage" src={spot.previewImage} alt={spot.name} />
                <div id="cardInfo">
                    <div id="location">
                        <p>{spot.city}, {spot.state}</p>
                    </div>
                    <div id="rating">
                        ⭐{spot.avgRating || `New`}
                    </div>
                </div>
                <p id="price">${spot.price} night</p>
            </Link>
        </div>
    )
}

export default SpotCards