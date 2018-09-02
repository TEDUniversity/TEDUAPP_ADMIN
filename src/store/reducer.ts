import * as types from "./types";

const initialState: types.GlobalState = {
  loggedIn: true
};

export default function reducer(
  state: types.GlobalState = initialState,
  action: types.Action
) {
  switch (action.type) {
    case types.UPDATE_LOGGED_IN:
      return { ...state, loggedIn: action.loggedIn };
    default: {
      return state;
    }
  }
}
