export const SAVE_POSTS = "SAVE_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";
export const SAVE_WEATHER_DATA = "SAVE_WEATHER_DATA";
export const GET_LOCATION_DATA = "GET_LOCATION_DATA";

export const deletePostById = (id) => (dispatch) => {
  dispatch({ type: DELETE_POSTS, payload: { id } });
};
