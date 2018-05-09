import React from 'react';
import { Route, Link } from 'react-router-dom';
import { BookList } from './components/BookList/BookList';
import { SearchScreen } from './components/SearchScreen/SearchScreen';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      query: '',
      searchResults: []
    }

    this.search = this.search.bind(this);
  }

  // Update state with all books currently in collection
  async componentDidMount() {
    const allBooks = await BooksAPI.getAll();
    this.setState({
      allBooks: allBooks
    });
  }

  // Move book to a different shelf
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    if (shelf === 'none') {
      this.setState({
        // Filter the old version of the book out of allBooks
        allBooks: this.state.allBooks.filter(allBook => allBook.id !== book.id)
      });
    } else {
      this.setState({
        // Filter the old version of the book out of allBooks and then concatenate the new version of the book
        allBooks: this.state.allBooks.filter(allBook => allBook.id !== book.id).concat([book])
      });
    }
  }

  // Update state with new query
  updateQuery = newQuery => {
    this.setState({
      query: newQuery
    });
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
    const booksCurrentlyReading = this.state.allBooks.filter(book => book.shelf === 'currentlyReading');
    const booksWantToRead = this.state.allBooks.filter(book => book.shelf === 'wantToRead');
    const booksRead = this.state.allBooks.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookList
                    books={booksCurrentlyReading}
                    updateShelf={this.updateShelf}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList
                    books={booksWantToRead}
                    updateShelf={this.updateShelf}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList
                    books={booksRead}
                    updateShelf={this.updateShelf}
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path="/search" render={() => (
          <SearchScreen
            query={this.state.query}
            searchResults={this.state.searchResults}
            updateQuery={this.updateQuery}
            search={this.search}
            allBooks={this.state.allBooks}
            updateShelf={this.updateShelf}
            clearResults={this.clearResults}
          />
        )} />
      </div>
    )
  }
}

export default App;
