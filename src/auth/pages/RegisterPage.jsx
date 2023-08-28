import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';


const formData = {
  displayName: 'Juan',
  email: 'juan@gmail.com',
  password: '123456'
};

const formValidations = {
  displayName: [(value) => value.length > 1, 'displayName is required'],
  email: [(value) => value.includes('@'), 'Email should contain a @'],
  password: [(value) => value.length >= 6, 'Password length should be at least 6 characters']
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  }

  return(
    <AuthLayout title='Create an account'>

      <h1>FormValid: {isFormValid ? 'Valid' : 'Invalid'}</h1>

      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField label="Name" type="text" placeholder='Name' name='displayName' value={displayName} onChange={onInputChange} fullWidth error={!!displayNameValid && formSubmitted} helperText={displayNameValid} />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField label="Email" type="email" placeholder='test@gmail.com' name='email' value={email} onChange={onInputChange} fullWidth error={!!emailValid && formSubmitted} helperText={emailValid} />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField label="Password" type="password" name='password' value={password} onChange={onInputChange} fullWidth error={!!passwordValid && formSubmitted} helperText={passwordValid} />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>Create</Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>Already have an account?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Login
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  );
}