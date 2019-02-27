const personsRequestedAction = () => {
  return ({
    type: 'FETCH_PERSONS_REQUEST',
  })
}

const personsLoadedAction = (newPersons) => {
  return ({
    type: 'FETCH_PERSONS_SUCCESS',
    payload: newPersons,
  })
}

const personsLoadErrorAction = (errorMessage) => {
  console.log(errorMessage);
  return ({
    type: 'FETCH_PERSONS_FAILURE',
    payload: errorMessage
  })
}

const changeCurrentPageAction = (newPage, maxPage) => {
  if (newPage > maxPage) {
    newPage = newPage - 1;
  } else if (newPage < 1) {
    newPage = newPage + 1;
  }

  return {
    type: 'CHANGE_CURRENT_PAGE',
    payload: newPage
  }
}

const searchAllColumnsAction = (initialItems, items, searchInput) => {
  if (searchInput.length === 0) {
    return {
      type: 'SEARCH_ALL_COLUMNS',
      payload: "",
      meta: initialItems
    }
  }

  return {
    type: 'SEARCH_ALL_COLUMNS',
    payload: searchInput,
    meta: items
  }
}

const onEditPersonRequestAction = (editablePerson) => {
  return {
    type: 'EDIT_PERSON_REQUEST',
    payload: editablePerson
  }
}

export {
  personsRequestedAction,
  personsLoadedAction,
  personsLoadErrorAction,
  changeCurrentPageAction,
  searchAllColumnsAction,
  onEditPersonRequestAction,
}