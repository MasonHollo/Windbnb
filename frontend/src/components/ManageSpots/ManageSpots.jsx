import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, getAllSpotsThunk } from "../../store/spots"; 
import SpotCards from "../subcomponents/spotcards";
import { useNavigate } from "react-router";
import DeleteModal from "./DeleteModal";
import './ManageSpots.css'
import { useModal } from "../../context/Modal";

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spots = useSelector(state => state.spots);
    const currentUser = useSelector(state => state.session.user);
   
    const { setModalContent, openModal, closeModal } = useModal();

    useEffect(() => {
        if (spots.allSpots.length === 0) {
            dispatch(getAllSpotsThunk());
        }
    }, [dispatch, spots.allSpots.length]);

    const userSpots = spots.allSpots.filter(spot => spot.ownerId === currentUser.id);
    const spotsExist = userSpots.length > 0;

    const handleUpdate = (spotId) => {
        navigate(`/spots/${spotId}/edit`); 
    };
    const openDeleteModal = (spotId) => {
        setModalContent(
            <DeleteModal 
                spotId={spotId} 
                handleDelete={handleDelete} 
                closeModal={closeModal}
            />
        );
        openModal(); 
    };

    const handleDelete = async (spotId) => {
        try {
            await dispatch(deleteSpotThunk(spotId)); 
            navigate('/spots/current');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        <h1 id="manageheader">Manage Your Spots</h1>
        <button id="createaspotbutton" onClick={() => navigate('/spots/new')}> Create A New Spot</button>
   
       
        <div className="spotList">
            {spotsExist ? (
                userSpots.map((spot) => {
                    const spotImage = spot.images && spot.images.length > 0 ? spot.images[0].url : null;
                    return (
                        <div key={spot.id} className="spotTile">
                            <SpotCards key={spot.id} spot={spot} spotImage={spotImage} />
                            <div className="managebuttons">
                                <button id='updatebutton'onClick={() => handleUpdate(spot.id)}>Update</button>
                                <button id='delbutton'onClick={()=> openDeleteModal(spot.id)}>Delete</button>
                            </div>
                        </div>
                    );
                })
            ) : (
             <a href="/spots/new">Create a New Spot</a>
            )}
        </div>
     
            </>
    );
};

export default ManageSpots;
