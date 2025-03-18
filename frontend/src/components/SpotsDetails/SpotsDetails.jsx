import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import "./SpotsDetails.css";
import { Link } from 'react-router-dom';

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
            <>
                <div>

                    {spot.Owner && (
                        <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName} </p>
                    )}
                </div>

                <div className='reserveBox'>
                    <p className='spotDescrip'>{spot.description}</p>
                    <div className='buttonContainer'>
                        <div className='topAreaButton'>

                        <p className='price'>${spot.price} night</p>
                        <p className='reviewSection'> ⭐ {spot.avgRating} · {spot.numReviews} reviews</p>
                        </div>
                        <Link to={`/reviews`} className="reviewLink" >
                            <button className='reserveButton'>Reserve</button>
                        </Link>
                    </div>
                </div>

            </>
        </div>
    );
};

export default SpotDetail;
