import React from 'react';
import * as BooksAPI from '../../utils/BooksAPI';
import { SearchBar } from '../SearchBar/SearchBar';
import { BookList } from '../BookList/BookList';
import PropTypes from 'prop-types';

export class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchResults: []
    }

    this.search = this.search.bind(this);
  }

  // Update state with search results
  async search(query) {
    const searchResults = await BooksAPI.search(query);
    this.setState({
      searchResults: searchResults
    });
  }

  // Clear search results
  clearResults = () => {
    this.setState({
      searchResults: []
    });
  }

  render() {
    return(
      <div className="search-books">
        <SearchBar onChange={this.search} clearResults={this.clearResults} />
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList books={this.state.searchResults} />
          </ol>
        </div>
      </div>
    );
  }
}

SearchScreen.propTypes = {

}
