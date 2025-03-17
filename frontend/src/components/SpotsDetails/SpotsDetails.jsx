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
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <div className="detailsImages">
                {spot.SpotImages.map((image) => (
                    <img key={image.id} src={image.url} className="spotImages" />
                ))}
            </div>
            <p>{spot.city}, {spot.state}</p>
            <p>Hosted by {spot.ownerId}</p>
            <p>{spot.description}</p>
            <p>${spot.price} per night</p>
        </div>
    );
};

export default SpotDetail;
