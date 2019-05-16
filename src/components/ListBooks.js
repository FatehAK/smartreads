import React from 'react';
import { Link } from 'react-router-dom';
import Books from './Books';
import logo from '../img/book.png';

class ListBooks extends React.Component {

    render() {

        const shelves = [
            {
                key: 'currentlyReading',
                name: 'Currently Reading'
            },
            {
                key: 'wantToRead',
                name: 'Want to Read'
            },
            {
                key: 'read',
                name: 'Save for Later'
            }
        ];

        let { books, updateShelf } = this.props;

        //returns a filtered list of books based on a key
        function getBooks(key) {
            return books.filter((book) => book.shelf === key);
        }

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-header animated slideInDown faster">
                        <h1>Smartreads</h1>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelves.map((shelf) => (
                                <div key={shelf.key} className="bookshelf">
                                    <h3 className="bookshelf-title">{shelf.name}</h3>
                                    <div className="bookshelf-books animated slideInLeft faster">
                                        <ol className="books-grid">
                                            {getBooks(shelf.key).length === 0 ? (
                                                <li>No books in this shelf</li>
                                            ) : (
                                                    getBooks(shelf.key).map((shelfBook, idx) => (
                                                        <li key={idx}><Books book={shelfBook} updateShelf={updateShelf} /></li>
                                                    ))
                                                )}
                                        </ol>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="footer">Crafted with <span>❤</span> by FatehAK</div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default ListBooks;
