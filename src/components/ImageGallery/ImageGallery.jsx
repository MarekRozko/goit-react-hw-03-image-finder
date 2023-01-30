
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './imageGallery.module.css';

const ImageGallery = ({ items, showModalImage }) => {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem items={items} showModalImage={showModalImage} />
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};
ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showModalImage: PropTypes.func,
};