import 'whatwg-fetch';
//deal with datafatching
function loadingData(boolean) {
  return {
    type: "LOADING_DATA",
    loading: boolean
  }

}
function fetchData(url) {
  return (dispatch) => {
    dispatch(loadingData(true));

    fetch(url)
      .then( (response) => {
        setTimeout(() => dispatch(loadingData(false)), 2000 )
        //imitate lag

        //assume i got it back
        return response;
      })
      .then((response) => {return response.json()})
      .then((data) => dispatch(fetchedData(data)) )
  }
}

function fetchedData(data) {
  return {
    type: "FETCHED_DATA",
    data: data
  }
}
//end deal with datafetching

function handleCrimeOptionsType(event, index, type) {
  return {
    type: "TYPE",
    crimetype: type
  }
}



export default {
  fetchData,
  fetchedData,
  loadingData,
  handleCrimeOptionsType

}
