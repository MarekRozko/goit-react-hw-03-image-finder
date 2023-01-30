import PropTypes from 'prop-types';

const ModalDetails = ({ largeImageURL }) => {
    return (
        <img src={largeImageURL} alt="" />
    )
}

export default ModalDetails;


ModalDetails.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};