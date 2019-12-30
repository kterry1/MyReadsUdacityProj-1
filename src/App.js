import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Components/Book";

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  updateBookShelf = i => shelf => {
    this.setState(currentState => ({
      books: currentState.books.map((book, diffIndex) => {
        return i === diffIndex ? { ...book, shelf } : book;
      })
    }));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
                          <li key={index}>
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
                          <li key={index}>
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
                          <li key={index}>
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
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
