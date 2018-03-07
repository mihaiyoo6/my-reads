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
    console.log('compoentnd mount');
    BooksAPI.getAll().then(books => this.setState({ books }));
  }
  handleSearch = (query) => {
    BooksAPI.search(query).then(searchResults => {
      this.setState({
        searchResults: searchResults.map(item => {
          const bookShelf = this.state.books.find(book => book.id === item.id);
          return Object.assign(item, { shelf: bookShelf ? bookShelf.shelf : 'none' });
        })
      });
    });
  }
  moveToShelf = (book, shelf) => {
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
        <Route path='/search' render={() => (
          <SearchPage
            searchQuery={this.state.searchQuery}
            books={this.state.books}
            searchResults={this.state.searchResults}
            moveToShelf={this.moveToShelf}
            handleSearch={this.handleSearch} />)} />
      </div>
    )
  }
}

export default BooksApp;
