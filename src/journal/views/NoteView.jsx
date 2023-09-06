import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote } from '../../store/journal';


export const NoteView = () => {

  const dispatch = useDispatch();

  const {active: activeNote} = useSelector(state => state.journal);

  const {title, body, onInputChange, date, formState} = useForm(activeNote);


  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);


  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  });

  const onSaveNote = () => {
    dispatch(startSaveNote());
  }



  return(
    <Grid className='animate__animated animate__fadeIn animate__faster'
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{mb: 1}}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>

      <Grid item>
        <Button color="primary" sx={{padding: 2}} onClick={onSaveNote}>
          <SaveOutlined sx={{fontSize: 30, mr: 1}} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Add a title"
                    label="Title"
                    sx={{border: 'none', mb: 1}}
                    name='title'
                    value={title}
                    onChange={onInputChange}
        />

        <TextField type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
        />
      </Grid>


      <ImageGallery />

    </Grid>
  );
}