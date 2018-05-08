import React from 'react';
import { BookList } from './components/BookList/BookList';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class App extends React.Component {
  state = {
    allBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
    book.shelf = shelf;
    BooksAPI.update(book, shelf);
    this.setState({
      // Filter the old version of the book out of allBooks and then concatenate the new version of the book
      allBooks: this.state.allBooks.filter(allBook => allBook.id !== book.id).concat([book])
    });
  }

  render() {
    const booksCurrentlyReading = this.state.allBooks.filter(book => book.shelf === 'currentlyReading');
    const booksWantToRead = this.state.allBooks.filter(book => book.shelf === 'wantToRead');
    const booksRead = this.state.allBooks.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookList books={booksCurrentlyReading} onChange={this.updateShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList books={booksWantToRead} onChange={this.updateShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList books={booksRead} onChange={this.updateShelf} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App;
