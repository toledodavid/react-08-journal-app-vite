import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';
import { login, logout } from '../store/auth';



export const AppRouter = () => {

  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const {uid, displayName, email, photoURL} = user;
      dispatch(login({uid, displayName, email, photoURL}));
    });
  }, []);

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return(
    <Routes>

      {
        (status === 'authenticated')
        ?  <Route path='/*' element={ <JournalRoutes /> } />
        :  <Route path='auth/*' element={ <AuthRoutes /> } />
      }

      <Route path='/*' element={<Navigate to='/auth/login' />} />

      {/* Login and Register */}
      {/* <Route path='auth/*' element={ <AuthRoutes /> } /> */}

      {/* JournalApp */}
      {/* <Route path='/*' element={ <JournalRoutes /> } /> */}
    </Routes>
  );
}