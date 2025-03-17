import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./SpotsList.css";
import SpotCards from "../subcomponents/spotcards";


const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots || { allIds: [], byId: {} });

    useEffect(() => {
        fetch("/api/spots")
        .then((res) => res.json())
        .then((data) => {
            if (data.Spots) {
                dispatch(getAllSpots(data.Spots));
            }
        })
}, [dispatch]);

    const spotsExist = spots.allIds && spots.allIds.length > 0;

    return (
        <div>
           
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
        </div>
    );
};

export default SpotsList;
