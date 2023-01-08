import * as actions from "../actions/posts";

const initialState = {
  hourly: [],
  cityName: "",
  current: {},
  daily: [],
  retreivedData: "",
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_WEATHER_DATA: {
      return {
        ...state,
        current: action.payload.current,
        hourly: action.payload.hourly,
        cityName: action.payload.cityName,
        daily: action.payload.daily,
      };
    }
    case actions.GET_LOCATION_DATA: {
      return {
        ...state,
        retreivedData: action.payload.retreivedData,
      };
    }

    default: {
      return state;
    }
  }
};

export default weatherReducer;

export const weatherSelector = (state) => state.weather;
