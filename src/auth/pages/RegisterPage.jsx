import {Link as RouterLink} from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';


const formData = {
  displayName: 'Juan',
  email: 'juan@gmail.com',
  password: '123456'
};

export const RegisterPage = () => {

  const {displayName, email, password, onInputChange, formState} = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  }

  return(
    <AuthLayout title='Create an account'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField label="Name" type="text" placeholder='Name' name='displayName' value={displayName} onChange={onInputChange} fullWidth />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField label="Email" type="email" placeholder='test@gmail.com' name='email' value={email} onChange={onInputChange} fullWidth />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField label="Password" type="password" name='password' value={password} onChange={onInputChange} fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' fullWidth>Create</Button>
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