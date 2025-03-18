import { csrfFetch } from './csrf';

// ---- Action Types ----
const GET_ALL_SPOTS = "GET_ALL_SPOTS";

// ---- Action Creator ----
export const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots || [],
});

// ---- Thunk Action ----
export const fetchAllSpots = () => async (dispatch) => {
        const res = await csrfFetch('/api/spots');
        const data = await res.json();
        dispatch(getAllSpots(data.Spots)); 
};

// ---- Reducer ----
const initialState = {
    allIds: [],
    byId: {},
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_SPOTS": {
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
        default:
            return state;
    }
};

export default spotReducer;