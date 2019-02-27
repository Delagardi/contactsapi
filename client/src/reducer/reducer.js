const initialState = {
  persons: [],
  personsView: [],
  totalPersonCount: 0,
  currentPage: 1,
  PERSONES_PER_PAGE: 8,
  searchTerm: "",
  isEditing: false,
  editablePerson: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PERSONS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }

    case 'FETCH_PERSONS_SUCCESS': {
      return {
        ...state,
        persons: action.payload,
        personsView: action.payload,
        totalPersonCount: action.meta,
        loading: false,
        error: null
      }
    }
     
    case 'FETCH_PERSONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case 'CHANGE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      }
    
    case 'SEARCH_ALL_COLUMNS':
      return {
        ...state,
        searchTerm: action.payload,
        personsView: action.meta
      }

    case 'EDIT_PERSON_REQUEST':
      return {
        ...state,
        isEditing: !state.isEditing,
        editablePerson: action.payload
      }

    default:
      return state
  }
}

export default reducer;