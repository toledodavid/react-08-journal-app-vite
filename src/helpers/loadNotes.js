import { collection, getDocs } from 'firebase/firestore/lite';
import { Firestore } from '../firebase/config';

export const loadNotes = async (uid) => {
  if (!uid) throw new Error('User uid does not exist');

  const collectionRef = collection(Firestore, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [];

  docs.forEach(doc => {
    notes.push({id: doc.id, ...doc.data()});
  });

  return notes;
}