import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';
// import { useParams } from 'react-router';

const PostReviewModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const { id } = useParams();
    //  const spot = useSelector(state => state.spots.byId[id]);
    const [review, setReviewText] = useState("");  
    const [stars, setStars] = useState(0); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            comment: review, 
            stars: stars,
        };

        if (reviewData.comment && reviewData.stars > 0) {
            await dispatch(createReviewThunk(spotId, reviewData));
            closeModal();
        } 
    };

    return (
        <div className="postreviewmodal">
            <h2>How was your stay at ?</h2>
            <input id='reviewinput'
                value={review}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
            />
            <div id='starholder' value={stars} onChange={(e) => setStars(Number(e.target.value))}>
                <option className='star' value={1}>⭐</option>
                <option className='star' value={2}>⭐</option>
                <option className='star' value={3}>⭐</option>
                <option className='star' value={4}>⭐</option>
                <option className='star' value={5}>⭐</option>
                <p>Stars</p>
            </div>
            <button id='submitreview' onClick={handleSubmit}>
                Submit Your Review
            </button>
        </div>
    );
};

export default PostReviewModal;
