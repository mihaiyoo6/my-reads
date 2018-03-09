import React from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import BookShelf from '../components/BookShelf/BookShelf';
import { searchTerms } from '../utils/constants';

const SearchPage = (props) => {
  const handleInput = debounce(value => {
    props.handleSearch(value);
  }, 300);
  const noResults = searchTerms.map(term => (<span key={term} className="search-sugestion" onClick={() => props.handleSearch(term)}>[{term}]</span >))
  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>Close</Link>
        <div className='search-books-input-wrapper'>
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input type='text' placeholder='Search by title or author' onChange={e => handleInput(e.target.value)} />

        </div>
      </div>
      <div className='search-books-results'>
        {
          props.searchResults.length === 0 ? noResults :
            <BookShelf title='Results' books={props.searchResults} moveToShelf={props.moveToShelf} />
        }



      </div>
    </div>
  );
}

export default SearchPage;