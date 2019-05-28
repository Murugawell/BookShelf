import React, { Component } from 'react';
import './styles/book.css';
class Book extends Component {
    state = {}

    moveBook(actionLabel) {

        this.props.setDataChange(actionLabel, this.props.book);

    }

    actionItem() {
        if (this.props.category) {

            return (
                <React.Fragment>
                    {
                        this.props.category.map((cat) => {
                            if (cat !== this.props.book.category) {
                                let actionLabel = cat;
                                if (cat === "CURRENT") {
                                    actionLabel = "READING";
                                }

                                return (
                                    <span key={actionLabel} className="dropdown-item" onClick={() => this.moveBook(actionLabel)}>{actionLabel}</span>

                                )
                            }
                        })
                    }
                </React.Fragment>
            )
        }
    }

    loadMoveToButton() {

        if (this.props.moveTo) {
            return (
                <div>
                    <span className="link nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Move To        </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {this.actionItem()}
                        <div className="dropdown-divider"></div>
                        <span className="dropdown-item" onClick={() => { this.moveBook('remove') }}>Remove From Shelf</span>
                    </div>
                </div>

            )
        }
    }

    loadAddButton() {
        if (this.props.addToWishList)
            return (
                <button onClick={() => this.props.addedToWishList(this.props)} type="button" className="btn btn-labeled btn-primary">
                    <span className="btn-label"><i className="glyphicon glyphicon-ok"></i></span>
                    Add to wish list
                </button>

            )


    }
    render() {
        return (<div className="book-container">
            <div>
                <img className="img" src={this.props.book.image_uri} alt={this.props.book.name} />
            </div>
            <span className="book-name">
                <i className="glyphicon glyphicon-book"></i>  {this.props.book.name}
            </span>
            <span className="author-name">
                <i className="glyphicon glyphicon-user"></i>    {this.props.book.author}
            </span>

            {
                this.loadMoveToButton()
            }
            {
                this.loadAddButton()
            }

        </div>
        );
    }
}

export default Book;