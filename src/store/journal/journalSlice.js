import {createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'abc123',
    //   title: '',
    //   body: '',
    //   date: 54342312,
    //   imageUrls: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    noteUpdated: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => (
        (note.id === action.payload.id) ? action.payload : note
      ));

      state.messageSaved = `${action.payload.title}, updated successfuly`;

    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      state.active = null;
    }
  }
});


export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById
} = journalSlice.actions;