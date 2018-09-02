export const UPDATE_LOGGED_IN = "UPDATE_LOGGED_IN";

export interface GlobalState {
  loggedIn: boolean;
}

export interface Audios {
  announceSound: string;
}

export interface Action {
  type: string;
  loggedIn?: boolean;
}
