import React, { Component } from 'react';
import loading from './../loading.svg';
import Book from './Book';
import { Link } from 'react-router-dom';
import './styles/search.css';
import Data from './DataSharing';
class Search extends Component {
    state = {
        books: [],
        isLoading: true,
        backup: []
    }

    componentDidMount() {
        console.log(this.props);
        Data.getData().then(res => {
            console.log(res);
            let json = res.filter((book) => book.category === null)
            this.setState({
                books: json,
                isLoading: false,
                backup: json
            })
        })
    }

    addedToWishList(event) {
        console.log(event);
        let temp
        Data.getData().then(res => {
            temp = res.filter((book) => {
                return book.id !== event.book.id
            })
            let newBook = event.book;
            newBook.category = 'WISHLIST';
            let array = [...temp, newBook]
            this.setState({ books: array.filter((ele) => ele.category === null) })
            Data.setData(array)
        })
    }


    loadBooks() {
        if (this.state.books.length > 0) {
            return (
                <React.Fragment>{
                    this.state.books.map((book) => {
                        return (<div className="inner-container" key={book.id}>
                            <Book addToWishList="true" book={book} addedToWishList={(event) => this.addedToWishList(event)}></Book>
                        </div>)
                    })
                }
                </React.Fragment>)
        }
        else {
            return (<React.Fragment>
                No books available
            </React.Fragment>)
        }
    }
    filter(event) {
        let searchString = event.target.value;
        if (searchString.trim()) {
            let filterArray = this.state.backup.filter((ele) => {
                if (ele.name.toLowerCase().includes(searchString.toLowerCase()) || ele.author.toLowerCase().includes(searchString.toLowerCase()))
                    return ele;
            })
            this.setState({
                books: filterArray
            });
        } else {
            this.setState({
                books: [...this.state.backup]
            });
        }
    }
    
    render() {
        if (this.state.isLoading) {
            return (
                <div className="loading-div">
                    <img className="svg" src={loading} alt="Loading" />
                </div>
            )
        } else {
            return (
                <div>
                    <div className="header">
                        <span className="span1">Search</span>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={(event) => this.filter(event)} aria-describedby="search box" placeholder="Search here" />
                        </div>
                        <span className="fixed-btn">
                            <Link to="/">

                                <button type="button" className="btn btn-labeled btn-primary">
                                    <span className="btn-label"><i className="glyphicon glyphicon-book"></i></span>
                                    Go To Book Shelf
                                    </button>

                            </Link>
                        </span>


                    </div>

                    <div className="container">
                        {this.loadBooks()}
                    </div>

                </div>);
        }


    }
}

export default Search;