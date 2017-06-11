import { combineReducers } from 'redux'

function data(state = {data: "wasa" }, action) {
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
