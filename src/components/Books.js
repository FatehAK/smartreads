import React from 'react';

class Books extends React.Component {

    render() {

        let { book, updateShelf } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.thumbnail})` : `url(../img/no_image_available)`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : 'none'} onChange={(evt) => updateShelf(book, evt.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Save for Later</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {(book.authors) && (
                    book.authors.map((author, idx) => (
                        <div key={idx} className="book-authors">{author}</div>
                    ))
                )}
            </div>
        );
    }
}

export default Books;
