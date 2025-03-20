import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import SpotCards from "../subcomponents/spotcards";
import './SpotsList.css'

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(fetchAllSpots());
    }, [dispatch]);

    const spotsExist = spots.allIds && spots.allIds.length > 0;

    return (
        <div className="spotList">
            {spotsExist ? (
                spots.allIds.map((spotId) => {
                    const spot = spots.byId[spotId];
                    return <SpotCards key={spot.id} spot={spot} />;
                })
            ) : (
                <p>No spots available</p>
            )}
        </div>
    );
};

export default SpotsList;
