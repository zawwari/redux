import { combineReducers } from "redux";
import postReducer from "./posts";
import weatherReducer from "./weather";
const rootReducer = combineReducers({
  posts: postReducer,
  weather: weatherReducer,
});

export default rootReducer;
