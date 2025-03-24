import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';

const DeleteRevModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal(); 

    const handleDelete = async () => {
            await dispatch(deleteReviewThunk(reviewId));
            closeModal(); 
    
        
    };

    return (
        <div className="deleteReviewModal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete} className="confirmDeleteBtn">Yes (Delete Review)</button>
            <button onClick={closeModal} className="cancelDeleteBtn">No (Keep Review)</button>
        </div>
    );
};

export default DeleteRevModal;

