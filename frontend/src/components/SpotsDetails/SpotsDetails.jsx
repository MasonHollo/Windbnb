import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./SpotsDetails.css";

const SpotDetail = () => {
    const { id } = useParams();
    const [spot, setSpot] = useState();

    useEffect(() => {
        fetch(`/api/spots/${id}`)
            .then((res) => res.json())
            .then((data) => { setSpot(data) });
    }, [id]);

    if (!spot) {
        return <p>Loading spot details...</p>;
    }

    return (
        <div>
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
