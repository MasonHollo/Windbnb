import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';

const PostReviewModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    
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
        <div className="post-review-modal">
            <h2>How was your stay?</h2>
            <textarea
                value={review}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
            />
            <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
                <option value={0}>Select rating</option>
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
            </select>
            <button onClick={handleSubmit} disabled={review.length < 10 || stars === 0}>
                Submit Your Review
            </button>
        </div>
    );
};

export default PostReviewModal;
