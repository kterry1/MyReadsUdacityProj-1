import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import terms from "./terms";
import { Route } from "react-router-dom";
import SearchPage from "./Components/SearchPage";
import ShelvesPage from "./Components/ShelvesPage";

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    search: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  addBook = book => {
    this.setState(currentState => ({
      books: [...currentState.books, book]
    }));
  };

  updateBookShelf = i => shelf => {
    this.setState(currentState => ({
      books: currentState.books.map((book, diffIndex) => {
        return i === diffIndex ? { ...book, shelf } : book;
      })
    }));
  };

  updateQuery = event => {
    this.setState(
      {
        query: event
      },
      () => this.searchBooks(this.state.query)
    );
  };

  searchBooks = querys => {
    if (terms().includes(this.state.query.trim())) {
      BooksAPI.search(querys.trim()).then(data => {
        this.setState({
          search: data
        });
      });
    } else {
      this.setState({
        search: []
      });
    }
  };

  clearSearch = () => {
    this.setState(() => ({
      query: "",
      search: []
    }));
  };

  render() {
    const { books, query, search } = this.state;
    const { updateBookShelf, addBook, updateQuery, clearSearch } = this;
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage
              books={books}
              query={query}
              search={search}
              updateBookShelf={updateBookShelf}
              addBook={addBook}
              updateQuery={updateQuery}
              clearSearch={clearSearch}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ShelvesPage
              books={books}
              query={query}
              search={search}
              updateBookShelf={updateBookShelf}
              addBook={addBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
