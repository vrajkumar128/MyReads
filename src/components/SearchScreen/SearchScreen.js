import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { BookList } from '../BookList/BookList';
import PropTypes from 'prop-types';

export class SearchScreen extends React.Component {
  render() {
    return(
      <div className="search-books">
        <SearchBar />
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

SearchScreen.propTypes = {

}
