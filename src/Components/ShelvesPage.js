import React from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";

function ShelvesPage(props) {
  const { books, updateBookShelf } = props;
  return (
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
                {books.map((book, index) => {
                  return book.shelf === "currentlyReading" ? (
                    <li key={book.id}>
                      <Book
                        book={book}
                        title={book.title}
                        author={book.authors[0]}
                        backgroundImage={book.imageLinks.thumbnail}
                        updateBook={updateBookShelf(index)}
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
                {books.map((book, index) => {
                  return book.shelf === "wantToRead" ? (
                    <li key={book.id}>
                      <Book
                        book={book}
                        title={book.title}
                        author={book.authors[0]}
                        backgroundImage={book.imageLinks.thumbnail}
                        updateBook={updateBookShelf(index)}
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
                {books.map((book, index) => {
                  return book.shelf === "read" ? (
                    <li key={book.id}>
                      <Book
                        book={book}
                        title={book.title}
                        author={book.authors[0]}
                        backgroundImage={book.imageLinks.thumbnail}
                        updateBook={props.updateBookShelf(index)}
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
  );
}

export default ShelvesPage;
