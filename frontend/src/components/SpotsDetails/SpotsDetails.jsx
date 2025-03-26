import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import CreateRevModal from './CreateRevModal'
import DeleteRevModal from './DeleteRevModal'
import "./SpotsDetails.css";

const SpotDetail = () => {
    const { id } = useParams();
    const { setModalContent } = useModal(); 
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.byId[id]);
    const reviews = useSelector(state => state.reviews.allReviews);
    const user = useSelector(state => state.session.user);
    const [loading, setLoading] = useState(true);
    const previewImage = spot?.SpotImages?.length > 0 ? spot.SpotImages[0]?.url : '';
    
    useEffect(() => {
        if (id) {
            dispatch(getAllReviewsThunk(id));
        }
    }, [dispatch, id]);
    
    useEffect(() => {
        if (spot && reviews) {
            setLoading(false);
        }
    }, [spot, reviews]);
    
    if (loading) {
        return <p>Loading spot details...</p>;
    }
    
    if (!spot || !spot.SpotImages) {
        return <p>Loading spot details...</p>;
    }
    
    const reviewText = reviews.length === 0 ? "⭐ New" : reviews.length === 1 ? `⭐ ${spot.avgRating} · 1 Review ` : `⭐ ${spot.avgRating} · ${reviews.length} Reviews`;
    const userHasReviewed = user && reviews.length > 0 && reviews.some(review => review.userId === user.id);
    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const formatReviewDate = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    const handleDeleteReview = (reviewId) => {
        setModalContent(
            <DeleteRevModal 
                reviewId={reviewId} 
                onConfirm={() => dispatch(deleteReviewThunk(reviewId))} 
            />
        );
    };
    
    return (
        <div className="spotDetails">
            <h3>{spot.name}</h3>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="detailsImages">
                {previewImage && <img id="spotImage" src={previewImage} alt={spot.name} />}
            </div>
            <div>
                {spot.Owner && (
                    <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                )}
            </div>

            <div className='reserveBox'>
                <p className='spotDescrip'>{spot.description}</p>
                <div className='buttonContainer'>
                    <div className='topAreaButton'>
                        <p className='price'>${spot.price} night</p>
                        <p className='reviewSection'>{reviewText}</p>
                    </div>
                    <button onClick={() => alert("Feature coming soon")} className='reserveButton'>Reserve</button>
                </div>
            </div>

            <div className='reviewsarea'>
                <h2>{reviewText}</h2>
                {user && !userHasReviewed && (
                <button id='postreviewbutton' onClick={() => setModalContent(<CreateRevModal spotId={id} />)}>
                Post Your Review
            </button>
            
                )}

                {sortedReviews.length > 0 ? (
                    <div className="reviewsList">
                        {sortedReviews.map((review) => (
                            <div key={review.id} className="reviewItem">
                                <p><strong>{review.User.firstName}</strong></p>
                                <p>{formatReviewDate(review.createdAt)}</p>
                                <p>{review.comment}</p>
                                {user && review.userId === user.id && (
                                    <button 
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="deleteReviewButton"
                                    >
                                        Delete Review
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Be the first to post a review!</p>
                )}
            </div>
        </div>
    );
};

export default SpotDetail;
