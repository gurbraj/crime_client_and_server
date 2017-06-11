import 'whatwg-fetch';

function loadingData(boolean) {
  return {
    type: "LOADING_DATA",
    loading: boolean
  }

}

function fetchData(url) {
  return (dispatch) => {
    dispatch(loadingData(true));
    const fakeurl = "https://surrey-crime.herokuapp.com/testing"
    //note this is url to the API
    fetch(fakeurl)
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

export default {
  fetchData,
  fetchedData,
  loadingData

}
