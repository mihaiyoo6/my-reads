import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf/BookShelf';
import { titles } from '../utils/constants';

const BookShelfsPage = ({ books = [], moveToShelf }) => {
  const shelfs = books.map(book => book.shelf).filter((item, index, self) => self.indexOf(item) === index);
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          {shelfs.map(shelf => <BookShelf key={shelf} title={titles[shelf]} books={books.filter(book => book.shelf === shelf)} moveToShelf={moveToShelf} />)}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div >
  );
}

export default BookShelfsPage;