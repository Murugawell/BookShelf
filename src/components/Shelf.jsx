import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loading from './../loading.svg';
import './styles/shelf.css';
import Book from './Book';
import Data from './DataSharing'


class Shelf extends Component {
    state = {
        books: [],
        isLoading: true
    }
    componentDidMount() {
        Data.getData().then(res => {
            console.log(res);
            let json = res.filter((book) => book.category !== null)
            this.setState({
                books: json,
                isLoading: false
            })
        })
    }
    setDataChange(actionLabel, book) {
        console.log(actionLabel)
        let changeCategory;
        switch (actionLabel) {
            case "remove":
                changeCategory = null;
                break;
            case "READING":
                changeCategory = "CURRENT";
                break;
            default:
                changeCategory = actionLabel;
                break;
        }
        const newBook = JSON.parse(JSON.stringify(book))
        // console.log('newBook', newBook)
        let temp;
        Data.getData().then(res => {
            console.log(res);
            temp = res.filter((ele) => {
                return ele.id !== newBook.id
            })
            newBook.category = changeCategory;
            console.log('newBook', newBook)
            console.log('temp', temp)
            const array = [...temp, newBook]
            console.log(array)
            Data.setData(array);
            this.setState({ books: array })
        })
    }

    loadBooks() {
        let cat = ["CURRENT", "WISHLIST", "COMPLETED"];
        console.log(cat);

        return (
            <div>
                {
                    cat.map((element) => {
                        let label = element;
                        if (element === "CURRENT") {
                            label = "READING"
                        }
                        return (
                            <div key={element} >
                                <div className="cat-header">{label}</div>
                                <div className="container">
                                    {
                                        this.state.books.map((book) => {
                                            if (element === book.category) {
                                                console.log(book);
                                                return (<div className="inner-container" key={book.id}>
                                                    <Book moveTo="true" book={book} category={cat} setDataChange={(label, book) => this.setDataChange(label, book)} />
                                                </div>)
                                            }
                                        })
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </div >
        )
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
                    <Link to="/search">
                        <button type="button" className="fixed-btn btn btn-labeled btn-primary">
                            <span className="btn-label"><i className="glyphicon glyphicon-search"></i></span>
                            Search
                        </button>
                    </Link>
                    <div>
                        {this.loadBooks()}
                    </div>

                </div>);
        }
    }
}

export default Shelf;