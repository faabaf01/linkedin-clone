import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
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

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));

    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadImg = uploadBytesResumable(storageRef, payload.image);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.message),
        async () => {
          //const downloadURL = await getDownloadURL(storageRef).then((url) => {
          //console.log("Download URL", url);
          //});
          await getDownloadURL(storageRef).then((url) => {
            const articleImgRef = collection(db, "Articles");
            addDoc(articleImgRef, {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: url,
              comments: 0,
              description: payload.description,
            });
            dispatch(setLoading(false));
          });
          // db.collection("articles").add({
          //   actor: {
          //     description: payload.user.email,
          //     title: payload.user.displayName,
          //     date: payload.timestamp,
          //     image: payload.user.photoURL,
          //   },
          //   video: payload.video,
          //   sharedImg: downloadURL,
          //   comments: 0,
          //   description: payload.description,
          // });
        }
      );
    } else if (payload.video) {
      const articleVidRef = collection(db, "Articles");
      addDoc(articleVidRef, {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}
export function getArticlesAPI() {
  return (dispatch) => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("actor.date", "desc"));
    onSnapshot(q, (snapshot) => {
      const payload = snapshot.docs.map((doc) => doc.data());
      // console.log(payload);
      dispatch(getArticles(payload));
    });
  };
}