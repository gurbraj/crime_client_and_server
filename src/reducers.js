import { combineReducers } from 'redux'

function data(state = {data: "wasa" }, action) {
  switch (action.type) {
    case "FETCHED_DATA":
      return {...state, data: action.data};
    default:
      return state
  }
}


export default combineReducers({
  data
})
