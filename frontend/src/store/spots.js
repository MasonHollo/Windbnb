import { csrfFetch } from './csrf';

// ---- Action Types ----
const GET_ALL_SPOTS = "spots/getAllSpots";
const CREATE_A_SPOT = "spots/creatASpot";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";

// ---- Action Creator ----
export const getAllSpotsAction = (data) => ({
    type: GET_ALL_SPOTS,
    payload: data
});

export const createASpotAction = (spot) => ({
    type: CREATE_A_SPOT,
    payload: spot,
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot,
})

export const deleteSpotAction = (spotId) => ({
    type: DELETE_SPOT,
    payload: spotId
})
// ---- Thunk Action ----

export const getAllSpotsThunk = () => async (dispatch) => {

        const res = await csrfFetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllSpotsAction(data));
        } else {
            throw res;
        }
    
};

export const createSpot = (spot, imageUrls = []) => async (dispatch) => {
    const { country, address, city, state, lat, lng, description, name, price } = spot;

        const response = await csrfFetch("/api/spots", {
            method: "POST",
            body: JSON.stringify({
                country,
                address,
                city,
                state,
                lat,
                lng,
                description,
                name,
                price,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const spotWithImages = { ...data, SpotImages: [] };

            if (imageUrls.length > 0) {
                for (let i = 0; i < imageUrls.length; i++) {
                    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
                        method: "POST",
                        body: JSON.stringify({
                            url: imageUrls[i],
                            preview: i === 0,
                        }),
                    });

                    if (imageResponse.ok) {
                        const imageData = await imageResponse.json();
                        spotWithImages.SpotImages.push(imageData);
                    }
                }
            }
            dispatch(createASpotAction(spotWithImages));

            return spotWithImages;
        }
    
};

export const updateSpotThunk = (spotId, spotData, imageUrls) => async (dispatch) => {
 
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            body: JSON.stringify({ ...spotData, imageUrls }),
        });

        if (!response.ok) {
            const errors = await response.json();
            return { errors };
        }

        const updatedSpot = await response.json();
        updatedSpot.SpotImages = imageUrls.map(url => ({ url })); 
        dispatch({
            type: 'UPDATE_SPOT',
            payload: updatedSpot,
        });

        return updatedSpot;
    
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
   
        const response = await csrfFetch(`/api/spots/${spotId}`, { method: "DELETE" });

        if (response.ok) {
            dispatch(deleteSpotAction(spotId));
        }
    
};

// ---- Reducer ----
const initialState = {
    allSpots: [],
    byId: {},
};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const spotsArr = action.payload.Spots;

            newState = { ...state };
            newState.allSpots = spotsArr;
            let newByIdGetAllSpots = {};
            for (let spot of spotsArr) {
                newByIdGetAllSpots[spot.id] = spot;
            }
            newState.byId = newByIdGetAllSpots;
            return newState;
        }
        case CREATE_A_SPOT: {
            const newSpot = action.payload;
            return {
                ...state,
                allSpots: [...state.allSpots, newSpot],
                byId: { ...state.byId, [newSpot.id]: newSpot },
            };
        }
        case DELETE_SPOT: {
            const newById = { ...state.byId };
            delete newById[action.payload];

            return {
                ...state,
                allSpots: state.allSpots.filter(spot => spot.id !== action.payload),
                byId: newById,
            };
        }
        case "UPDATE_SPOT": {
            const updatedSpot = action.payload;
            const updatedSpots = state.allSpots.map(spot =>
                spot.id === updatedSpot.id ? updatedSpot : spot
            );

            return {
                ...state,
                allSpots: updatedSpots,
                byId: {
                    ...state.byId,
                    [updatedSpot.id]: updatedSpot,
                },
            };
        }

        default:
            return state;
    }
};

export default spotReducer;
