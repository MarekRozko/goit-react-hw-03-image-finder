import { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { getSearchImages } from './Fetch/ImagesApi';
import Loader from './Loader/Loader';
import ModalDetails from './Modal/ModalDetails';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalHits: 0,
    showModal: false,
    modalDetails: null,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await getSearchImages(search, page)

      const { hits, totalHits } = data;
      if (hits.length <= 0) {
        toast.warn('Sorry, there is no image with this name, try to find something else!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      if (page === 1) {
        toast.success(`Congratulations! We found ${totalHits} images.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      
      this.setState(({ items}) => ({
        items: [...items, ...hits],
        totalHits,
      }));
    } catch (error) {
      this.state({ error: error.massage });
    } finally {
      this.setState({ loading: false });
    }
  }

  imagesSearch = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModalImage = ({ largeImageURL, tags }) => {
    this.setState({
      modalDetails: {
        largeImageURL,
        tags,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalDetails: null,
    });
  };

  render() {
    const { items, loading, error, totalHits, showModal, modalDetails} = this.state;
    const { imagesSearch, loadMore, showModalImage, closeModal } = this;

    return (
      <>
        <Searchbar onSubmit={imagesSearch} />
        <ImageGallery items={items} showModalImage={showModalImage} />
        {error && <p>{error.massage}</p>}
        {loading && <Loader />}
         {items.length > 0 && items.length < totalHits && (
          <Button loadMore={loadMore}>Load more</Button>
        )}
        {showModal && (<Modal closeModal={closeModal}><ModalDetails {... modalDetails} /></Modal>
        )}
        <ToastContainer/>
      </>
    );
  }
}

