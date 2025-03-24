import { csrfFetch } from './csrf';

// ---- Action Types ----
const GET_ALL_REVIEWS = "spots/getAllReviews";
const CREATE_REVIEW = "spots/createReview";


// ---- Action Creator ----
export const getAllReviewsAction = (data) => ({
    type: GET_ALL_REVIEWS,
    payload: data
});

export const createAReviewAction = (review) => ({
    type: CREATE_REVIEW,
    payload: review,
})

// ---- Thunk Action ----

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllReviewsAction(data));
        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
};

// export const createReviewThunk = (review) => async (dispatch) => {
//     const { country, address, city, state, lat, lng, description, name, price } = review;
//     try {
//         const response = await csrfFetch(`/api/spots/${spotId}`, {
//             method: "POST",
//             body: JSON.stringify({
//                 country,
//                 address,
//                 city,
//                 state,
//                 lat,
//                 lng,
//                 description,
//                 name,
//                 price,
//             }),
//         });

//         if (res.ok) {
//             const data = await res.json();
//             dispatch(createAReviewAction(data));
//         } else {
//             throw res;
//         }
//     } catch (e) {
//         console.log(e);
//     }
// };

// ---- Reducer ----
const initialState = {
    allReviews: [],
    byId: {},
};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const reviewsArr = action.payload.Reviews;

            newState = { ...state };
            newState.allReviews = reviewsArr;
            let newByIdGetAllReviews = {};
            for (let review of reviewsArr) {
                newByIdGetAllReviews[review.id] = review;
            }
            newState.byId = newByIdGetAllReviews;
            return newState;
        }

        default:
            return state;
    }
};

export default reviewReducer;