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
    const [hoverStars, setHoverStars] = useState(0);

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
            <div id='starholder'>
             {[1, 2, 3, 4, 5].map((num) => (
                    <span 
                        key={num} 
                        className={`star ${num <= (hoverStars || stars) ? 'filled' : ''}`}
                        onMouseEnter={() => setHoverStars(num)}
                        onMouseLeave={() => setHoverStars(0)}
                        onClick={() => setStars(num)}
                    >★</span>
             ))}
             <p> Stars</p>
            </div>
            <button id='submitreview' onClick={handleSubmit} disabled={review.length < 10 || stars === 0}>
                Submit Your Review
            </button>
        </div>
    );
};

export default PostReviewModal;
