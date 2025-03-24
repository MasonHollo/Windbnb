import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots"; // Updated thunk name
import SpotCards from "../subcomponents/spotcards";
import './SpotsList.css';

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        if (spots.allSpots.length === 0) {
            dispatch(getAllSpotsThunk());
        }
    }, [dispatch, spots.allSpots.length]);

    const spotsExist = spots.allSpots && spots.allSpots.length > 0;

    return (
        <div className="spotList">
            {spotsExist ? (
                spots.allSpots.map((spot) => {
                    const spotImage = spot.images && spot.images.length > 0 ? spot.images[0].url : null;
                    return <SpotCards key={spot.id} spot={spot} spotImage={spotImage} />;
                })
            ) : (
                <p>No spots available</p>
            )}
        </div>
    );
};

export default SpotsList;
