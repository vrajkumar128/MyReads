import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { BookList } from '../BookList/BookList';
import PropTypes from 'prop-types';

export class SearchScreen extends React.Component {
  render() {
    return(
      <div className="search-books">
        <SearchBar query={this.props.query} updateQuery={this.props.updateQuery} onChange={this.props.search} clearResults={this.props.clearResults} />
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList books={this.props.searchResults} updateShelf={this.props.updateShelf} />
          </ol>
        </div>
      </div>
    );
  }
}

SearchScreen.propTypes = {
  query: PropTypes.string,
  updateQuery: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}
