import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrentPageAction } from '../actions';

import './pagination.css';

class Pagination extends Component {
  render() {
    const {
      currentPage,
      changeCurrentPage,
      PERSONES_PER_PAGE,
      personsView
    } = this.props;

    const totalPersonCount = personsView.length;
    
    const totalPages = Math.ceil(totalPersonCount/PERSONES_PER_PAGE);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li 
          className="page-item page-link"
          key={number}
          id={number}
          onClick={() => changeCurrentPage(number)}>
          {number}
        </li>
      );
    });
    
    return (
      <nav className="pagination-wrapper" aria-label="pagination">
        <ul className="pagination justify-content-center">
          <li 
            className="page-item page-link"
            onClick={() => changeCurrentPage(currentPage-1, totalPages)}>
            Previous
          </li>
            {renderPageNumbers}
          <li 
            className="page-item page-link"
            onClick={() => changeCurrentPage(currentPage+1, totalPages)}>
            Next
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({  
    currentPage,
    changeCurrentPage,
    PERSONES_PER_PAGE,
    personsView
  }) => {
    return {
      currentPage,
      changeCurrentPage,
      PERSONES_PER_PAGE,
      personsView
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (newPage, maxPages) => dispatch(changeCurrentPageAction(newPage, maxPages))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

