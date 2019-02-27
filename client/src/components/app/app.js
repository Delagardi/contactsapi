import React, { Component } from 'react';
import ContactList from '../contact-list';
import Header from '../header';
import Pagination from '../pagination';
import ContactEdit from '../contact-edit';

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="contact-app">
        <Header/>
        <ContactList/>
        <ContactEdit/>
        <Pagination/>
      </div>
    );
  }
}

export default App;
