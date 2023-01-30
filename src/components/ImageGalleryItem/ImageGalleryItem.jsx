import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ items, showModalImage }) => {
  return items.map(({ id, webformatURL, largeImageURL }) => (
    <li onClick={() => showModalImage({ largeImageURL })} key={id}>
      <img
        src={webformatURL}
        alt=""
        className={styles.itemImages}
      />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showModalImage: PropTypes.func,
};