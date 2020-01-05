import React, { Component } from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={e => this.props.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.search.map((book, index) => (
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
                  updateBook={this.props.updateBookShelf(index)}
                  addBook={this.props.addBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
