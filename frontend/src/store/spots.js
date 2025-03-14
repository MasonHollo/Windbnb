
//---- Action Creator ----

export const getAllSpots = (spots) => ({
    type: "GET_ALL_SPOTS",
    payload: spots
});

// ---- Reducer ---- 
const initialState = {
    allIds: [],
    byId: {},
};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case "GET_ALL_SPOTS":{
            const spots = action.payload;
            newState = { ...state };
            newState.allIds = [];
            newState.byId = {};

            for (let spot of spots) {
                newState.allIds.push(spot.id);
                newState.byId[spot.id] = spot;
            }

            return newState;
        }
        default:
            return state;
    }
};


export default spotReducer;