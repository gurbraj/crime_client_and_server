import { combineReducers } from 'redux'

//hydrate state?!

function data(state = {}, action) {
  switch (action.type) {
    case "FETCHED_DATA":
      return {...state, data: action.data};
    case "LOADING_DATA":
      return {...state, loading: !state.loading }
    default:
      return state
  }
}


export default combineReducers({
  data
})
