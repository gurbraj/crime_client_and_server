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

function crimeoptions(state={crimetype: "Total Crime", crimetime: "All Years"}, action) {
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

  if (data && filter!=="All Years") {

    let filteredData = {crimelocations: [] }
    
    data.crimelocations.forEach( (crimelocation)=> {
      let hundred_block = crimelocation.hundred_block
      let hundred_block_geocoded = crimelocation.hundred_block_geocoded
      let geometry = crimelocation.geometry


      let crimesFiltered = crimelocation.crimes.filter((crime) => {
          let date = new Date(crime.date)
          let year = date.getFullYear().toString()
          return year === filter
        })

      let crimelocationHash = {hundred_block: hundred_block, hundred_block_geocoded: hundred_block_geocoded, geometry: geometry , crimes: crimesFiltered }

      filteredData.crimelocations.push(crimelocationHash)
    })

    return filteredData

  }  else {
    return data
  }

}
