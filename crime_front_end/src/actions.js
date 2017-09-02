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
    //let url = "https://surrey-crime-spots.herokuapp.com/crime"
    fetch(url)
      .then( (response) => {
        setTimeout(() => dispatch(loadingData(false)), 2000 )

        if (!response.ok) {

        }
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
function handleCrimeOptionsTime(event, index, time) {
  return {
    type: "TIME",
    crimetime: time
  }
}
// chat actions below.
function contactAdded(phone_number) {
  return {
    type: "CONTACT_ADDED",
    phone_number: phone_number
  }
}



export default {
  fetchData,
  fetchedData,
  loadingData,
  handleCrimeOptionsType,
  handleCrimeOptionsTime,
  contactAdded

}
