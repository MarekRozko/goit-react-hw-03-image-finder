import PropTypes from 'prop-types';

const ModalDetails = ({ largeImageURL, tags }) => {
    return (
        <img src={largeImageURL} alt={tags} />
    )
}

export default ModalDetails;


ModalDetails.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};