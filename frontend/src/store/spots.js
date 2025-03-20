import { csrfFetch } from './csrf';

// ---- Action Types ----
const GET_ALL_SPOTS = "GET_ALL_SPOTS";
const CREATE_A_SPOT = "CREATE_A_SPOT";

// ---- Action Creator ----
export const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots || [],
});

export const createASpot = (spot) => ({
    type: CREATE_A_SPOT,
    payload: spot,
})

// ---- Thunk Action ----
export const fetchAllSpots = () => async (dispatch) => {
        const res = await csrfFetch('/api/spots');
        const data = await res.json();
        dispatch(getAllSpots(data.Spots)); 
};

export const createSpot = (spot) => async (dispatch) => {
    const { country, address, city, state, lat, lng, description, name, price, previewImage, spotImages } = spot;
    try{
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
         previewImage,
         spotImages
        }),
});
const data = await response.json();
dispatch(createASpot(data));
dispatch(fetchAllSpots());
return response;
    }catch (error) {
        console.error("could not create spot", error)
    }
};

// ---- Reducer ----
const initialState = {
    allIds: [],
    byId: {},
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const spots = action.payload;

            return {
                ...state,
                allIds: spots.filter(spot => spot.id).map(spot => spot.id),  
                byId: spots.reduce((acc, spot) => {
                    if (spot.id) {
                        acc[spot.id] = spot;
                    } 
                    return acc;
                }, {}), 
            };
        }
        case CREATE_A_SPOT: {
            const newSpot = action.payload;
            return {
                ...state,
                allIds: [ ...state.allIds, newSpot.id ],
                byId: { ...state.byId, [newSpot.id]: newSpot}
            };
        }
        default:
            return state;
    }
};

export default spotReducer;