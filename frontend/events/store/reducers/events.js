import {
  DELETE_EVENT,
  CREATE_EVENT,
  UPDATE_EVENT,
  SET_EVENTS,
} from "../actions/events";
import Event from "../../models/event";

const initialState = {
  availableEvents: [],
  userEvents: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        availableEvents: action.events,
        userEvents: action.userEvents,
      };
    case CREATE_EVENT:
      const newEvent = new Event(
        action.eventData.id,
        action.eventData.hostId,
        action.eventData.imageUrl,
        action.eventData.name,
        action.eventData.description,
        action.eventData.location,
        action.eventData.eventDate,
        action.eventData.eventTime,
        action.eventData.seats
      );
      return {
        ...state,
        availableEvents: state.availableEvents.concat(newEvent),
        userEvents: state.userEvents.concat(newEvent),
      };
    case UPDATE_EVENT:
      const eventIndex = state.userEvents.findIndex(
        (ev) => ev.id === action.pid
      );
      const updatedEvent = new Event(
        action.pid,
        state.userEvents[eventIndex].hostId,
        action.eventData.imageUrl,
        action.eventData.name,
        action.eventData.description,
        action.eventData.location,
        action.eventData.eventDate,
        action.eventData.eventTime,
        action.eventData.seats
      );
      const updatedUserEvents = [...state.userEvents];
      updatedUserEvents[eventIndex] = updatedEvent;
      const availableEventIndex = state.availableEvents.findIndex(
        (ev) => ev.id === action.pid
      );
      const updatedAvailableEvents = [...state.availableEvents];
      updatedAvailableEvents[availableEventIndex] = updatedEvent;
      return {
        ...state,
        availableEvents: updatedAvailableEvents,
        userEvents: updatedUserEvents,
      };
    case DELETE_EVENT:
      return {
        ...state,
        userEvents: state.userEvents.filter((event) => event.id !== action.pid),
        availableEvents: state.availableEvents.filter(
          (event) => event.id !== action.pid
        ),
      };
  }
  return state;
};
