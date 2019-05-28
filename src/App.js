import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Shelf from './components/Shelf';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>Book Shelf</span>
      </header>
      <div>
        <Router>
          <Route path="/" exact strict component={Shelf}>
          </Route>
          <Route path="/search" exact strict component={Search} temp="hi">
          </Route>
        </Router>
      </div>
    </div>
  );
}


export default App;
