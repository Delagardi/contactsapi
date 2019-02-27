import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
  personsRequestedAction,
  personsLoadedAction,
  onEditPersonRequestAction,
  personsLoadErrorAction 
} from '../actions';


import './contact-edit.css';

class ContactEdit extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      name: '',
      email: '',
      funds: '',
      city: '',
      phone: '',
      res: {}
    }
  }

  componentDidMount() {
    this.props.personsRequested();

    axios.get('http://localhost:8080')
      .then(res => {
        this.componentDidMount()

        this.props.personsLoaded(res.data.data)
        return this.setState({ res : res.data.data })
      })
      .catch( (error) => this.props.personsLoadError(error) );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.editablePerson.id !== prevState.id) {
    return {
      id: nextProps.editablePerson.id,
      name: nextProps.editablePerson.name,
      email: nextProps.editablePerson.email,
      funds: nextProps.editablePerson.funds,
      city: nextProps.editablePerson.city,
      phone: nextProps.editablePerson.phone
    };
  }
    return null;
  }

  onLabelChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  onSubmitForm = (event) => {
    const { 
      id,
      name, 
      email, 
      funds, 
      city, 
      phone 
    } = this.state;

    event.preventDefault();

    const person = {
      id,
      name,
      email,
      funds,
      city,
      phone
    };

    axios.put(`http://localhost:8080/update/${id}`, person)
      .then(res => {

        return this.props.onEditPersonRequest(res.data)
      })
      .catch( (error) => this.props.personsLoadError(error) );
  }

  render() {
    const { 
      name, 
      email, 
      funds, 
      city, 
      phone 
    } = this.state;

    const { isEditing } = this.props;

    if (!isEditing) {
      return null;
    }

    return (
      <form 
        className="form-inline"
        onSubmit={this.onSubmitForm}>
        <input 
          type="text" 
          className="form-control mb-2 mr-sm-2" id="inlineFormInputName"
          name="name"
          value={name}
          onChange={this.onLabelChange}/>
        <input 
          type="text" 
          className="form-control mb-2 mr-sm-2" 
          id="inlineFormInputEmail" 
          name="email"
          value={email}
          onChange={this.onLabelChange}/>
        <input 
          type="text" 
          className="form-control mb-2 mr-sm-2"
          id="inlineFormInputFunds" 
          name="funds"
          value={funds}
          onChange={this.onLabelChange}/>
        <input 
          type="text" 
          className="form-control mb-2 mr-sm-2"
          id="inlineFormInputCity" 
          name="city"
          value={city}
          onChange={this.onLabelChange}/>
        <input 
          type="text" 
          className="form-control mb-2 mr-sm-2"
          id="inlineFormInputPhone" 
          name="phone"
          value={phone}
          onChange={this.onLabelChange}/>
        <button type="submit" className="btn btn-primary mb-2 change-person">Submit</button>
      </form>
    )
  }  
}

const mapStateToProps = ({ isEditing, editablePerson }) => {
  return {
    isEditing,
    editablePerson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPersonRequest: (editablePerson) => dispatch(onEditPersonRequestAction(editablePerson)),
    personsRequested: () => dispatch(personsRequestedAction()),
    personsLoaded: (newPersons) => dispatch(personsLoadedAction(newPersons)),
    personsLoadError: (error) => dispatch(personsLoadErrorAction(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);

