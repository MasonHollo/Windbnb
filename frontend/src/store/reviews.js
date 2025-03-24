import { csrfFetch } from './csrf';

// ---- Action Types ----
const GET_ALL_REVIEWS = "spots/getAllReviews";
const CREATE_REVIEW = "spots/createReview";
const DELETE_REVIEW = "spots/deleteReview"

// ---- Action Creator ----
export const getAllReviewsAction = (data) => ({
    type: GET_ALL_REVIEWS,
    payload: data
});

export const createAReviewAction = (review) => ({
    type: CREATE_REVIEW,
    payload: review,
})

export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
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
    } catch (error) {
        throw (error);
    }
};

export const createReviewThunk = (spotId, review) => async (dispatch) => {
    const { comment, stars } = review;
 
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify({
               comment,
               stars,
               spotId,
               userId: review.userId
            }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createAReviewAction(data));
        } else {
            throw response;
        }
    
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
      } else {
            throw response;
        }
    
  };
  
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

        case CREATE_REVIEW: {
            const newReview = action.payload;
            
            return {
                ...state,
                allReviews: [newReview, ...state.allReviews],
                byId: {
                    ...state.byId,
                    [newReview.id]: newReview,
                },
            };
        }
        case DELETE_REVIEW: {
            const reviewId = action.payload;
            const newState = { ...state };
            newState.allReviews = newState.allReviews.filter(review => review.id !== reviewId);
            delete newState.byId[reviewId];
            return newState;
          }

        default:
            return state;
    }
};

export default reviewReducer;