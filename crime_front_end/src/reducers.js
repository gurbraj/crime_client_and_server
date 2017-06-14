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

function crimeoptions(state={crimetype: "Total Crime", time: "All Years"}, action) {
  switch (action.type) {
    case "TYPE":
      return {...state, crimetype: action.crimetype}
    case "TIME":
      return {...state, crimetime: action.crimetime}
    default:
      return state

  }
}


export default combineReducers({
  data,
  crimeoptions
})

//selectors goes here
export function getVisibleData(data, filter) {
  //can do it differently so instead of data, it gets passed state...
  //think this only should be passed the TIME filter ing
  switch (filter) {
    case "Total Crime":
      return data
    case "Shoplifting":

      return data
    default:
      return data

  }
}
