const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                <p>{review.User?.firstName} {review.User?.lastName}</p>
                <p>{review.createdAt}</p>
            </div>
            <p>{review.review}</p>
        </div>
    );
};

export default ReviewCard;
