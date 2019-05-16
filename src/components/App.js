import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class App extends React.Component {

    state = {
        books: []
    };

    //get all the books currently subscribed
    componentDidMount() {
        BooksAPI.getAll().then((response) => {
            this.setState({
                books: response
            });
        });
    }

    updateShelf = (book, shelf) => {
        //for book already in the state
        //we check if the selected book is in the state
        let bookInState = this.state.books.find((bis) => bis.id === book.id);
        if (bookInState) {
            //the props change here
            //the props 'books' passed to ListBooks and SearchBooks are dependent on the state
            //now we set the state with updated books and also pass down the updated props
            bookInState.shelf = shelf;
            BooksAPI.update(book, shelf).then((response) => {
                this.setState({
                    books: this.state.books
                });
            });
        } else {
            //for new book that is added
            book.shelf = shelf;
            BooksAPI.update(book, shelf).then((response) => {
                this.setState((prevState) => ({
                    books: prevState.books.concat(book)
                }));
            });
        }
    };

    render() {

        let { books } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks books={books} updateShelf={this.updateShelf} />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks books={books} updateShelf={this.updateShelf} />
                )} />
            </div>
        );
    }
}

export default App;
