import React from 'react';
import { BookList } from './components/BookList/BookList';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class App extends React.Component {
  state = {
    allBooks: [],
    booksCurrentlyReading: [],
    booksWantToRead: [],
    booksRead: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  async componentDidMount() {
    // Update state with all books currently in collection
    const allBooks = await BooksAPI.getAll();
    this.setState({
      allBooks: allBooks
    });

    // Sort allBooks onto their respective bookshelves
    this.state.allBooks.forEach(book => {
      if (book.shelf === 'currentlyReading') {
        this.setState({
          booksCurrentlyReading: this.state.booksCurrentlyReading.concat([book])
        });
      } else if (book.shelf === 'wantToRead') {
        this.setState({
          booksWantToRead: this.state.booksWantToRead.concat([book])
        });
      } else {
        this.setState({
          booksRead: this.state.booksRead.concat([book])
        });
      }
    });
    console.log(this.state);
  }

  render() {
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
                  <BookList books={this.state.booksCurrentlyReading} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList books={this.state.booksWantToRead} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList books={this.state.booksRead} />
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
