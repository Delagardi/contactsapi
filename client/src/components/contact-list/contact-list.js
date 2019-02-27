import React, { Component } from 'react';
import ContactItem from '../contact-item';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
  personsRequestedAction,
  personsLoadedAction,
  personsLoadErrorAction 
} from '../actions';

import './contact-list.css';

class ContactList extends Component {
  componentDidMount() {
    this.props.personsRequested();

    axios.get('http://localhost:8080')
      .then(res => {    
        this.props.personsLoaded(res.data.data)
        return res
      })
      .catch( (error) => this.props.personsLoadError(error) );
  }

  render() {
    const { personsView, currentPage, PERSONES_PER_PAGE } = this.props;
    
    const currentPersonsView = personsView.slice(
        (currentPage*PERSONES_PER_PAGE) - PERSONES_PER_PAGE, currentPage*PERSONES_PER_PAGE
      )

    const elements = currentPersonsView.map(
      person => {
        const { id, name, email, funds, city, phone } = person;

        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            email={email}
            funds={funds}
            city={city}
            phone={phone}
          />
        )
      }
    );

    return (
      <div className="container contact-list">
        <table className="persons-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Funds</th>
              <th>City</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {elements}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ personsView, currentPage, PERSONES_PER_PAGE }) => {
  return {
    personsView, 
    currentPage, 
    PERSONES_PER_PAGE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    personsRequested: () => dispatch(personsRequestedAction()),
    personsLoaded: (newPersons) => dispatch(personsLoadedAction(newPersons)),
    personsLoadError: (error) => dispatch(personsLoadErrorAction(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);