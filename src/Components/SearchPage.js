import React from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";

function SearchPage(props) {
  const { search, query, addBook, updateBookShelf, updateQuery } = props;
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
            value={query}
            onChange={e => updateQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {search.map((book, index) => (
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
                updateBook={updateBookShelf(index)}
                addBook={addBook}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
