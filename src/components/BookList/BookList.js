import React from 'react';
import { Book } from '../Book/Book';
import PropTypes from 'prop-types';

export class BookList extends React.Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.length ? this.props.books.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                allBooks={this.props.allBooks}
                onChange={this.props.updateShelf}
              />
            </li>
          ))
          : null}
        </ol>
      </div>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  allBooks: PropTypes.array,
  updateShelf: PropTypes.func.isRequired
}
