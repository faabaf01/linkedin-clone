import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        // Handle successful sign-in here
        // const user = result.user;
        // console.log(payload.user);
        dispatch(setUser(payload.user));
        // Dispatch an action if needed
        // dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      })
      .catch((error) => {
        // Handle sign-in error here
        alert(error.message);
        // Dispatch an action if needed
        // dispatch({ type: "SIGN_IN_FAILURE", payload: error });
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
