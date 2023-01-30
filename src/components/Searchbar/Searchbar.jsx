import { Component } from 'react';
import PropTypes from 'prop-types';


import styles from './searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();
    if (search.trim() === '') {
      toast.error("Enter image's name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <header className={styles.header}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <input
            className={styles.SearchInput}
            value={search}
            onChange={handleChange}
            name="search"
            placeholder="Search images and photo"
                />
            <button
            type="submit"
            className={styles.SearchButton}
            onClick={handleSubmit}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>    
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};