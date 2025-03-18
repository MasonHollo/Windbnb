import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import "./SpotsDetails.css";

const SpotDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.byId[id]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!spot) {
            dispatch(fetchAllSpots(id));
        } else {
            setLoading(false);
        }
    }, [id, dispatch, spot]);
    console.log(spot)

    if (loading) {
        return <p>Loading spot details...</p>;
    }

    return (
        <div className="spotDetails">
            <h3>{spot.name}</h3>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="detailsImages">
                {spot.SpotImages.map((image, index) => (
                    <img
                        key={image.id}
                        src={image.url}
                        className={index === 0 ? "largeImage" : "smallImage"}
                        alt={`Spot ${index + 1}`}
                    />
                ))}
            </div>
            {spot.Owner && (
                <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
            )}
            <p>{spot.description}</p>
            <p>${spot.price} per night</p>
        </div>
    );
};

export default SpotDetail;
