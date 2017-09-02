import { combineReducers } from 'redux'
import  crimelocationsyearlyaggregated2016  from "./crimelocationsyearlyaggregated2016.json"


//hydrated state below

function data(state = { data: crimelocationsyearlyaggregated2016 }, action) {
  switch (action.type) {
    case "FETCHED_DATA":
      return {...state, data: action.data};
    case "LOADING_DATA":
      return {...state, loading: !state.loading }
    default:
      return state
  }
}

function crimeoptions(state={crimetype: "Total Crime", crimetime: "2016"}, action) {
  switch (action.type) {
    case "TYPE":
      return {...state, crimetype: action.crimetype}
    case "TIME":
      return {...state, crimetime: action.crimetime}
    default:
      return state

  }
}

//chat reducers below
function contacts(state=[], action) {
  switch (action.type) {
    case "CONTACT_ADDED":
      return [...state, action.phone_number]
    default:
      return state
  }

}


export default combineReducers({
  data,
  crimeoptions,
  contacts

})

//selectors goes here
