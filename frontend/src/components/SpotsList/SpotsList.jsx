import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./SpotsList.css";

import spotcards from "../subcomponents/spotcards";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots || { allIds: [], byId: {} });

    useEffect(() => {
        fetch("/api/spots")
            .then((res) => res.json())
            .then((data) => { dispatch(getAllSpots(data.spots)) })
    }, [dispatch]);


    const spotsExist = spots.allIds && spots.allIds.length > 0;

    return (
        <div>
           
            <div className="spotList">
                {spotsExist ? (
                    spots.allIds.map((spotId) => {
                        const spot = spots.byId[spotId];
                        return spotcards(spot)
                    })
                ) : (
                    <p>No spots available</p>
                )}
            </div>
        </div>
    );
};

export default SpotsList;
