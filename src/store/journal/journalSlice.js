import {createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'abc123',
    //   title: '',
    //   body: '',
    //   date: 54342312,
    //   imgUrls: []
    // }
  },
  reducers: {
    addNewEmptyNote: (state, action) => {

    },
    setActiveNote: (state, action) => {

    },
    setNotes: (state, action) => {

    },
    setSaving: (state) => {

    },
    updateNote: (state, action) => {

    },
    deleteNoteById: (state, action) => {

    }
  }
});


export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById
} = journalSlice.actions;