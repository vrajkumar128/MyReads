import React from 'react';
import PropTypes from 'prop-types';

export const Book = props => {

  // Move book to selected shelf
  const handleChange = e => {
    props.onChange(props.book, e.target.value);
  }

  return (
    <div className="book">
      <div className="book-top">
        {props.book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div> : <div className="book-cover" style={{ width: 128, height: 193, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No cover image</div>}
        <div className="book-shelf-changer">
          {// If a search result is already in the collection, set the search result's shelf to match; else set to 'none'
          props.allBooks && (props.allBooks.find(allBook => allBook.id === props.book.id) ?
          props.book.shelf = props.allBooks.find(allBook => allBook.id === props.book.id).shelf
          : props.book.shelf = 'none')}
          <select defaultValue={props.book.shelf} onChange={handleChange}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      {props.authors ? <div className="book-authors">{props.authors.join(' & ')}</div> : <div className="book-authors">Unknown author</div>}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  allBooks: PropTypes.array,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array
}
