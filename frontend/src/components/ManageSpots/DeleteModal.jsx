


const DeleteModal = ({ spotId, handleDelete, closeModal }) => {
    const confirmDelete = () => {
        handleDelete(spotId);
        closeModal(); 
    };

    return (
        <div className="deleteModal">
            <h3 id="deleteHeader">Confirm Delete</h3>
            <p id="deleteMsg">Are you sure you want to remove this spot
            from the listings?</p>
            <div className="deleteModalActions">
                <button className="yesButton" onClick={confirmDelete}> Yes (Delete Spot) </button>
                <button className="noButton" onClick={closeModal}> No (Keep Spot) </button>
            </div>
        </div>
    );
};

export default DeleteModal;
