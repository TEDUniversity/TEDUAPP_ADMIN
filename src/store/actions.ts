import * as types from "./types";

export function updateScore(newLoggedIn: boolean): types.Action {
  return {
    type: types.UPDATE_LOGGED_IN,
    loggedIn: newLoggedIn
  };
}
