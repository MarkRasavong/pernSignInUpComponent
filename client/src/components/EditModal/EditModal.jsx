import React, {useState} from 'react';
import { Button, Modal, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from '../Authorization/Input';
import { updateUserData } from '../../actions/user';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ userId, fName, lName, auth, email }) => {
  const isAdmin = process.env.REACT_APP_CODIGO_ADMIN;
  const isUser = process.env.REACT_APP_CODIGO_USARIO;
  const [ adminStatus, setAdminStatus ] = useState(auth);
  const [ open, setOpen ] = useState(false);
  const userIsAdmin = auth === isAdmin;
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const methods = useForm({
    defaultValues: {
      first_name: fName, last_name: lName, id: userId, email: email, autoritzacio:auth
    }
  });

  const onSubmit = async (data) => {
    await dispatch(updateUserData(userId, data));
    handleClose();
    window.location.reload();
  };

  return (
  <React.Fragment>
    <Button sx={{marginRight: '10px' }} variant="outlined" color="primary" onClick={handleOpen}>Edit</Button>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Typography variant="h6" component="h2">
        Edit User
      </Typography>
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ mt: 2 }}>
          <Input name="first_name" label="First Name" minCharLength={2} />
          <Input name="last_name" label="Last Name" minCharLength={2} sx={{ mt: 2 }}/>
          <TextField
            sx={{ mt: 2 }} 
            fullWidth label="email" type="email"
            error={!!methods.formState.errors["email"]}
            helperText={methods.formState.errors["email"]?.message ?? ''}
            {...methods.register("email",{required: true, pattern: {
              value: /^([a-z\d\.-_]+)+@(email\.com)$/,
              message: "Invalid email: must have the domain @email.com"
            }})}
            />
            <Input name="id" label="User ID" disabled sx={{ mt: 2 }}/>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={adminStatus}
              disabled={userIsAdmin && true}
              label="Role"
              {...methods.register('autoritzacio', {
                onChange: (e) => setAdminStatus(e.target.value)
              })}
            >
              <MenuItem value={isAdmin}>Admin</MenuItem>
              <MenuItem value={isUser}>User</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Button sx={{ mr: 1 }} variant="contained" color="secondary" 
          type='submit'>Save</Button>
            <Button sx={{ mr: 1 }} variant='contained' color="error" disabled={userIsAdmin && true}>Delete</Button>
            <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          </Box>
          </Box>
        </form>
        </FormProvider>
      </Box>
    </Modal>
      </React.Fragment>
      )
}

export default EditModal;