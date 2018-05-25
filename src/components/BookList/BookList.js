import React from 'react';
import { Book } from '../Book/Book';
import loader from '../../icons/loader.gif';
import PropTypes from 'prop-types';

export class BookList extends React.Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {// If response from server has been received, render any books on the shelf; else show a loading spinner
          this.props.responseReceived ? this.props.books.length && this.props.books.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                allBooks={this.props.allBooks}
                onChange={this.props.updateShelf}
              />
            </li>
          )) : <img src={loader} alt="Loading spinner" />}
        </ol>
      </div>
    )
  }
}

BookList.propTypes = {
  responseReceived: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  allBooks: PropTypes.array,
  updateShelf: PropTypes.func.isRequired
}
