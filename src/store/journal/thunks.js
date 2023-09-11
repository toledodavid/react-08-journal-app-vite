import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { Firestore } from '../../firebase/config';
import { addNewEmptyNote, noteUpdated, savingNewNote, setActiveNote, setNotes, setSaving } from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const {uid} = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const newDoc = doc(collection(Firestore, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }
}


export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;
    if (!uid) throw new Error('User uid does not exist');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  }
}


export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving());

    const {uid} = getState().auth;
    const {active: activeNote} = getState().journal;

    const noteToFirestore = {...activeNote};
    delete noteToFirestore.id;

    const docReference = doc(Firestore, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docReference, noteToFirestore, {merge: true});

    dispatch(noteUpdated(activeNote));
  }
}


export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    await fileUpload(files[0]);
  }
}