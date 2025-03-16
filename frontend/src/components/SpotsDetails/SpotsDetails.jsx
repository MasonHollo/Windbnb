import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./SpotsDetails.css";

const SpotDetail = () => {
    const { id } = useParams();
    const [spot, setSpot] = useState();

    useEffect(() => {
        fetch(`/api/spots/${id}`)
            .then((res) => res.json())
            .then((data) => { 
                console.log("Fetched spot data:", data); // Debugging
                setSpot(data);
            });
    }, [id]);

    if (!spot) {
        return <p>Loading spot details...</p>;
    }


    return (
        <div>
            <h3>{spot.name}</h3>
            <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            <img src={spot.previewImage} alt={spot.name} />

            <p>Hosted by {spot.ownerId}</p>
            <p>{spot.description}</p>
            <p>${spot.price} per night</p>
        </div>
    );
};

export default SpotDetail;
