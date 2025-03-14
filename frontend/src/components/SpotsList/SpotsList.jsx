import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { Link } from 'react-router-dom';
import "./SpotsList.css";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots || { allIds: [], byId: {} });

    useEffect(() => {
        fetch("/api/spots")
            .then((res) => res.json())
            .then((data) => { dispatch(getAllSpots(data.Spots)) })
    }, [dispatch]);


    const spotsExist = spots.allIds && spots.allIds.length > 0;

    return (
        <div>
            <h1>All Spots</h1>
            <div className="spotList">
                {spotsExist ? (
                    spots.allIds.map((spotId) => {
                        const spot = spots.byId[spotId];
                        return (
                            <Link to={`/spots/${spot.id}`} key={spot.id} className="spotItem">
                                <h3>{spot.name}</h3>
                                <img src={spot.previewImage} alt={spot.name} />
                                <p>{spot.city}, {spot.state}</p>
                                <p>${spot.price} per night</p>
                            </Link>
                        );
                    })
                ) : (
                    <p>No spots available</p>
                )}
            </div>
        </div>
    );
};

export default SpotsList;
