import React from 'react';
import { Book } from '../Book/Book';
import PropTypes from 'prop-types';

export class BookList extends React.Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                shelf={book.shelf}
                backgroundImageUrl={book.imageLinks.thumbnail}
                title={book.title}
                authors={book.authors}
              />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired
}
