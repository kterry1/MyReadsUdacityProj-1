import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Components/Book";
import terms from "./terms";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

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

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={e => this.updateQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.search.map((book, index) => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        title={book.title}
                        author={book.authors}
                        backgroundImage={
                          book.imageLinks
                            ? book.imageLinks.thumbnail
                            : "https://read.macmillan.com/simple-book-page-template/book-cover-placeholder/"
                        }
                        updateBook={this.updateBookShelf(index)}
                        addBook={this.addBook}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.map((book, index) => {
                          return book.shelf === "currentlyReading" ? (
                            <li key={book.id}>
                              <Book
                                book={book}
                                title={book.title}
                                author={book.authors[0]}
                                backgroundImage={book.imageLinks.thumbnail}
                                updateBook={this.updateBookShelf(index)}
                              />
                            </li>
                          ) : null;
                        })}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.map((book, index) => {
                          return book.shelf === "wantToRead" ? (
                            <li key={book.id}>
                              <Book
                                book={book}
                                title={book.title}
                                author={book.authors[0]}
                                backgroundImage={book.imageLinks.thumbnail}
                                updateBook={this.updateBookShelf(index)}
                              />
                            </li>
                          ) : null;
                        })}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.map((book, index) => {
                          return book.shelf === "read" ? (
                            <li key={book.id}>
                              <Book
                                book={book}
                                title={book.title}
                                author={book.authors[0]}
                                backgroundImage={book.imageLinks.thumbnail}
                                updateBook={this.updateBookShelf(index)}
                              />
                            </li>
                          ) : null;
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" className="open-search-button">
                  Add a Book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
