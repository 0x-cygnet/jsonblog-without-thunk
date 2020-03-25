import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";
import store from "../store";

export const fetchPostsAndUsers = () => async dispatch => {
  await fetchPosts()(dispatch);
  console.log(store.getState());
  _.chain(store.getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => fetchUser(id)(dispatch))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  console.log(response);

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  console.log(response);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
