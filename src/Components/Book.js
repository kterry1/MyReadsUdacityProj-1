import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class Book extends Component {
  state = {
    title: this.props.title,
    author: this.props.author,
    backgroundImage: this.props.backgroundImage
  };

  handleChange = e => {
    BooksAPI.update(this.props.book, e.target.value);
    this.props.updateBook(e.target.value);
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.state.backgroundImage})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange}>
              <option
                value="move"
                style={{ backgroundColor: "#2e7c31", color: "white" }}
              >
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.state.title}</div>
        <div className="book-authors">{this.state.author}</div>
      </div>
    );
  }
}

export default Book;
