import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import SearchPage from './pages/SearchPage';
import BookShelfsPage from './pages/BookShelfsPage';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchQuery: '',
    searchResults: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }
  handleSearch = (query) => {
    if (query.length === 0) {
      this.setState({ searchQuery: query, searchResults: [] });
    } else {
      BooksAPI.search(query).then(searchBooks => {
        const searchResults = searchBooks.error ? [] : searchBooks.map(item => {
          const bookShelf = this.state.books.find(book => book.id === item.id);
          return Object.assign(item, { shelf: bookShelf ? bookShelf.shelf : 'none' });
        });
        this.setState({
          searchQuery: query,
          searchResults
        });
      });
    }
  }
  moveToShelf = (book, shelf) => {
    if (!this.state.books.find(({ id }) => id === book.id)) {
      //handle state for adding new books from search
      this.setState({
        books: this.state.books.concat(Object.assign(book, { shelf }))
      })
    }

    BooksAPI.update(book, shelf).then(result => {
      const ids = {}
      Object.keys(result)
        .forEach(key => result[key]
          .forEach(id =>
            Object.assign(ids, { [id]: key })
          )
        );
      console.log('ids', ids);
      this.setState({
        books: this.state.books.map(book => Object.assign(book, { shelf: ids[book.id] }))
      });
    });
  }
  render() {
    return (
      <div className='app' >
        <Route exact path='/' render={() => (
          <BookShelfsPage books={this.state.books}
            moveToShelf={this.moveToShelf} />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchPage
            searchQuery={this.state.searchQuery}
            searchResults={this.state.searchResults}
            moveToShelf={(book, shelf) => {
              console.log('book', book, 'shelf', shelf);
              this.moveToShelf(book, shelf);
            }}
            handleSearch={this.handleSearch} />)}
        />
      </div>
    )
  }
}

export default BooksApp;
