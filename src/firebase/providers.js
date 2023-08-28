import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const {displayName, email, photoURL, uid} = result.user;

    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}


export const registerUserWithEmailAndPassword = async ({email, password, displayName}) => {
  try {

    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    // console.log(response);

    const {uid, photoURL} = response.user;

    await updateProfile(FirebaseAuth.currentUser, {displayName});

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}


export const loginWithEmailAndPassword = async ({email, password}) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const {uid, displayName, photoURL} = response.user;

    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}