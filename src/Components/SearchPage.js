import React from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";

function SearchPage(props) {
  const {
    search,
    query,
    addBook,
    updateBookShelf,
    updateQuery,
    books,
    clearSearch
  } = props;
  const parseShelf = (books, search) =>
    search.map(s => {
      const book = books.find(b => b.id === s.id);
      if (book) {
        s.shelf = book.shelf;
      } else {
        s.shelf = "none";
      }
      return s;
    });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" onClick={clearSearch}>
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
          {parseShelf(books, search).map((book, index) => (
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
