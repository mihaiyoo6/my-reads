import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf/BookShelf';

const BookShelfsPage = () => {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <BookShelf title='Currently Reading' books={[]} />
          <BookShelf title='Want to Read' books={[]} />
          <BookShelf title='Read' books={[]} />
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
        {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
      </div>
    </div >
  );
}

export default BookShelfsPage;