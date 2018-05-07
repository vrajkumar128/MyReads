import React from 'react';
import PropTypes from 'prop-types';

export const Book = props => {

  // Update App.js' state with book's new shelf
  const handleChange = e => {
    props.onChange(e.target.value);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.backgroundImageUrl})` }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={props.shelf} onChange={handleChange}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors.join(' & ')}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  backgroundImageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired
}
