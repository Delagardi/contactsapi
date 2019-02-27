import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import { searchAllColumnsAction, changeCurrentPageAction } from '../actions';

import './search.css';

class Search extends Component {
  onSearchChange = (event) => {
    const { persons, searchAllColumns, changeCurrentPage } = this.props;
    const searchInput = event.target.value;

    const options = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'email', 'funds', 'city', 'phone']
    };
    const fuse = new Fuse(persons, options);

    // Going to the first page before search
    changeCurrentPage(1);
    
    searchAllColumns(persons, fuse.search(event.target.value), searchInput);
  }

  render() {
    const { searchTerm } = this.props;

    return <input 
            className="form-control search-input"
            value={searchTerm}
            onChange={this.onSearchChange}
            placeholder="Search here"/>
  }
}

const mapStateToProps = ({ searchTerm, persons, personsView }) => {
  return {
    searchTerm,
    persons,
    personsView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchAllColumns: (persons, personsView, searchTerm) => dispatch(searchAllColumnsAction(persons, personsView, searchTerm)),
    changeCurrentPage: (page) => dispatch(changeCurrentPageAction(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);