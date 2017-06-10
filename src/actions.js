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
    const fakeurl = "https://jsonplaceholder.typicode.com/posts"
    fetch(fakeurl)
      .then( (response) => {
        dispatch(loadingData(false))
        //assume i got it back
        return response;
      })
      .then((response) => response.json())
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
