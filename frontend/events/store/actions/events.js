import Event from "../../models/event";
// import axios from "axios";
import api from "../../config/api";
import axios from "axios";

export const DELETE_EVENT = "DELETE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const SET_EVENTS = "SET_EVENTS";

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    // const userId = getState().auth.userId;
    // const baseURL = api.baseUrl + "/getevents";
    try {

      const response = await fetch(api.geteventUrl, {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json",
        }),
      })
        .then((result) => {
          if(result.ok){
            return result;
          }
        })
        .catch((err) => {
          console.log(err);
        });


      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedEvents = [];

      for (const key in resData) {
        
        loadedEvents.push(
          new Event(
            key,
            resData[key].hostId,
            resData[key].imageUrl,
            resData[key].name,
            resData[key].description,
            resData[key].location,
            resData[key].eventDate,
            resData[key].eventTime,
            resData[key].seats
          )
        );
      }

      dispatch({
        type: SET_EVENTS,
        events: loadedEvents,
        userEvents: loadedEvents,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteEvent = (eventId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const baseURL = api.baseUrl;
    const response = await axios.delete(baseURL + `/delete/${eventId}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_EVENT, pid: eventId });
  };
};

export const createEvent = (
  imageUrl,
  name,
  description,
  location,
  eventDate,
  eventTime,
  seats
) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(api.baseUrl + "/newEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostId: userId,
        imageUrl,
        name,
        description,
        location,
        eventDate,
        eventTime,
        seats,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_EVENT,
      eventData: {
        id: resData.name,
        hostId: userId,
        imageUrl,
        name,
        description,
        location,
        eventDate,
        eventTime,
        seats,
      },
    });
  };
};

export const updateEvent = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(api.baseUrl + `/update/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl,
        name,
        description,
        location,
        eventDate,
        eventTime,
        seats,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_EVENT,
      pid: id,
      eventData: {
        imageUrl,
        name,
        description,
        location,
        eventDate,
        eventTime,
        seats,
      },
    });
  };
};
