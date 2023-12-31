import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import css from '../Styles/styles.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    setSearchQuery(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!searchQuery.trim()) return alert('Fill the searchbar');

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FiSearch size="18px" />
          </button>

          <input
            value={searchQuery}
            onChange={handleChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};
