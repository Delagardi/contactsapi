import React from 'react';
import { connect } from 'react-redux';
import { onEditPersonRequestAction } from '../actions';

const ContactItem = (props) => {
  const { 
    id, 
    name, 
    email, 
    funds, 
    city, 
    phone,
    onEdit
  } = props;

  const personItem = {
    id, 
    name, 
    email, 
    funds, 
    city, 
    phone,
    onEdit
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{funds}</td>
      <td>{city}</td>
      <td>{phone}</td>
      <td>
        <button type="button"
                className="btn btn-outline-success btn-sm float-right status"
                onClick={() => onEdit(personItem)}>
          <i className="fa fa-pencil" />
        </button>
      </td>
    </tr>
  )
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: (editablePerson) => dispatch(onEditPersonRequestAction(editablePerson))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);