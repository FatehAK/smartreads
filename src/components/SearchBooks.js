import React from 'react';
import { Link } from 'react-router-dom';
import Books from './Books';
import * as BooksAPI from '../utils/BooksAPI';

class SearchBooks extends React.Component {

    state = {
        query: '',
        results: [],
        searchErr: false
    };

    updateQuery = (query) => {
        this.setState({
            results: [],
            query: query
        });
        //on each update to the query we make the search
        this.searchQuery(query);
    };

    searchQuery = this.debounce((query) => {
        if (query) {
            BooksAPI.search(query).then((searchResults) => {
                if (searchResults.length > 0) {
                    this.setState({
                        results: this.syncShelf(searchResults),
                        searchErr: false
                    });
                } else {
                    this.setState({
                        results: [],
                        searchErr: true
                    });
                }
            });
        }
    }, 900);

    //debouncing function for the ajax call
    debounce(fun, wait) {
        let timeout;
        return function(...args) {
            clearInterval(timeout);
            timeout = setTimeout(() => fun.apply(this, args), wait);
        }
    }

    clearQuery = () => {
        this.setState({
            query: '',
            results: [],
            searchErr: false
        })
    };

    //sync the shelves of books in state and books in result
    syncShelf = (searchResults) => {
        let booksInState = this.props.books;
        searchResults.forEach((result) => {
            booksInState.forEach((book) => {
                if (book.id === result.id) {
                    result.shelf = book.shelf;
                }
            });
        });
        return searchResults;
    };

    render() {

        let { updateShelf } = this.props;
        let { query, results, searchErr } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar animated slideInDown faster">
                    <Link to="/" className="close-search" onClick={() => this.clearQuery()}>Close</Link>
                    <input type="text" placeholder="Search term.." onChange={(evt) => { this.updateQuery(evt.target.value) }} value={query} autoFocus />
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!searchErr ? (
                            results.map((result) => (
                                <li key={result.id}><Books book={result} updateShelf={updateShelf} /></li>
                            ))
                        ) : (
                                <li>No results available</li>
                            )
                        }
                        {(!query) && (!searchErr) && (results.length === 0) && (
                            <div className="search-terms">
                                <p className="search-terms-head">The backend API uses a fixed set of cached search results and is limited to a particular set of search terms -</p>
                                <p className="search-terms-content">
                                    Android, Art, Artificial, Intelligence, Astronomy, Baseball, Basketball, Bhagat, Biography, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS
                                </p>
                            </div>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;
