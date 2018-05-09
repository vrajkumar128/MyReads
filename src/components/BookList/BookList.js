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
                shelf={book.shelf}
                title={book.title}
                authors={book.authors}
                onChange={this.props.updateShelf}
              />
            </li>
          )) : <span>No search results</span>}
        </ol>
      </div>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}
