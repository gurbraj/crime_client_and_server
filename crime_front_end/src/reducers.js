import { combineReducers } from 'redux'
import  crimelocationsyearlyaggregated2016  from "./crimelocationsyearlyaggregated2016.json"
import openSocket from 'socket.io-client';
const url = "http://localhost:4000"
const socket = openSocket(url);

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
    case "CONTACTS_FETCHED":
        return [...action.contacts]
    default:
      return state
  }

}

function messages(state={}, action) {
  switch (action.type) {
    case "CHAT_ROOM_LAUNCHED":
      return {...state, phone_number: action.phone_number}
    case "MESSAGE_SENT":
      socket.emit('chat message', action.messageobj)
      return state
    case "MESSAGES_FETCHED":
      var obj = {}
      obj[action.phone_number] = action.contact_messages;
      return Object.assign({}, state, obj)
    case "MESSAGE_HANDLED":
      console.log(action)
      let phoneNumber = action.message_obj.phone_number;
      let contactMessages = state[action.message_obj.phone_number]? [...state[action.message_obj.phone_number], action.message_obj ] : [action.message_obj]
      var obj = {}
      obj[action.message_obj.phone_number] = contactMessages;
      return Object.assign({}, state, obj)

    default:
      return state
  }
}


export default combineReducers({
  data,
  crimeoptions,
  contacts,
  messages

})

//selectors goes here
