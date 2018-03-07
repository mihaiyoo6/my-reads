import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf/BookShelf';
import { shelfs, shelfsTitles } from '../utils/constants';

const BookShelfsPage = ({ books = [], moveToShelf }) => {

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          {shelfs.map(shelf => <BookShelf key={shelf} title={shelfsTitles[shelf]} books={books.filter(book => book.shelf === shelf)} moveToShelf={moveToShelf} />)}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div >
  );
}

export default BookShelfsPage;