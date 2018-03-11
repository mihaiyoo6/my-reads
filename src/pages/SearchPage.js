import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import BookShelf from '../components/BookShelf/BookShelf';
import { searchTerms } from '../utils/constants';

class SearchPage extends Component {
  state = {
    value: this.props.searchQuery
  }
  handleInput = value => {
    this.setState({ value });
    return debounce(() => {
      this.props.handleSearch(value);
    }, 300)();
  }
  noResults = () => {
    return <div>
      {(this.props.searchResults.length === 0 && this.state.value.length !== 0) ?
        <h3>No Results, you can chosse from this categories</h3> : <h3>Suggestions:</h3>
      }
      {searchTerms.map(term => (<span key={term} className="search-sugestion" onClick={() => this.handleInput(term)}> [{term}]</span >))}
    </div>

  }
  render() {
    return (
      <div className='search-books' >
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
            <input type='text' placeholder='Search by title or author' value={this.state.value} onChange={e => { this.handleInput(e.target.value) }} />

          </div>
        </div>
        <div className='search-books-results'>
          {
            this.props.searchResults.length === 0 ? this.noResults() :
              <BookShelf title='Results' books={this.props.searchResults} moveToShelf={this.props.moveToShelf} />
          }
        </div>
      </div>
    );
  }
}

export default SearchPage;