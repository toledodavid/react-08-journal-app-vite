import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { Firestore } from '../../firebase/config';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const newDoc = doc(collection(Firestore, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

  }
}