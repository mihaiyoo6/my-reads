import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import SearchPage from './pages/SearchPage';
import BookShelfsPage from './pages/BookShelfsPage';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }
  handleSearch() {
    console.log('handle search');
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
          <SearchPage handleSearch={this.handleSearch} />)} />
      </div>
    )
  }
}

export default BooksApp;
