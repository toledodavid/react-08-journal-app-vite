import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/journal';


export const NoteView = () => {

  const dispatch = useDispatch();

  const {active: activeNote, messageSaved, isSaving} = useSelector(state => state.journal);

  const {title, body, onInputChange, date, formState} = useForm(activeNote);

  const fileInputRef = useRef();


  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Note updated', messageSaved, 'success');
    }
  }, [messageSaved]);


  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  });

  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
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

        <input type='file'
                multiple
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{display: 'none'}}
        />

        <IconButton color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <Button disabled={isSaving} color="primary" sx={{padding: 2}} onClick={onSaveNote}>
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