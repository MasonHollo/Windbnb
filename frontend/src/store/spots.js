
//---- Action Creator ----

export const getAllSpots = (spots) => ({
    type: "GET_ALL_SPOTS",
    payload: spots || [],
});

// ---- Reducer ---- 
const initialState = {
    allIds: [],
    byId: {},
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_SPOTS": {
            const spots = action.payload;

            console.log("Spots received:", spots);


            const newState = {
                ...state,
                allIds: spots.filter(spot => spot.id).map(spot => spot.id),  
                byId: spots.reduce((acc, spot) => {
                    if (spot.id) {
                        acc[spot.id] = spot;
                    } else {
                        console.warn("Spot missing id", spot);
                    }
                    return acc;
                }, {}), 
            };

            return newState;
        }
        default:
            return state;
    }
};

export default spotReducer;