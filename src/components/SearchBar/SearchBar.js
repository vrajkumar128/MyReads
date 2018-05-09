import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const SearchBar = props => {

  // Search for results using search input
  const handleChange = e => {
    props.updateQuery(e.target.value);
    e.target.value ? props.onChange(e.target.value) : props.clearResults();
  }

  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
        <input type="search" placeholder="Search by title or author" value={props.query} onChange={handleChange} />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  query: PropTypes.string
}
