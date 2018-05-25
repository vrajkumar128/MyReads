import React from 'react';
import PropTypes from 'prop-types';

export const Book = props => {

  // Move book to selected shelf
  const handleChange = e => {
    props.onChange(props.book, e.target.value);
  }

  // If a book has a cover image, display it; else display "No cover image"
  const coverImage = () => props.book.imageLinks ?
    <div className="book-cover" style={{ width: 128, height: 193, background: `url(${props.book.imageLinks.thumbnail}) center no-repeat`, backgroundSize: 'cover' }}></div>
    : <div className="book-cover" style={{ width: 128, height: 193, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No cover image</div>

  // If a search result is already in the collection, set the search result's shelf to match; else set to 'none'
  const defaultValue = () => props.allBooks && props.allBooks.find(allBook => allBook.id === props.book.id) ?
    props.book.shelf = props.allBooks.find(allBook => allBook.id === props.book.id).shelf
    : props.book.shelf = 'none'

  // If a book's authors are known, display them joined by an ampersand; else display "Unknown author"
  const authors = () => props.book.authors ?
    <div className="book-authors">{props.book.authors.join(' & ')}</div>
    : <div className="book-authors">Unknown author</div>

  return (
    <div className="book">
      <div className="book-top">
        {coverImage()}
        <div className="book-shelf-changer">
          <select defaultValue={props.book.shelf ? props.book.shelf : defaultValue()} onChange={handleChange}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      {authors()}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  allBooks: PropTypes.array,
  onChange: PropTypes.func.isRequired
}
