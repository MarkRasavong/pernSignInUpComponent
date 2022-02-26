import React, {useState, useEffect} from 'react';
import { Button, Modal, Box, Typography, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../actions/user';

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

const EditModal = ({ adminControls, userId }) => {
  const dispatch = useDispatch();
  const fetchedUser = useSelector((state) => state.users.fetchedUser.data[0]);
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(fetchedUser);

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
      <Box sx={{ mt: 2 }}>
        <FormGroup>          
          <TextField variant='outlined' label='First Name' value={fetchedUser.first_name}/>
          <TextField sx={{ mt: 1 }} variant='outlined' label='Last Name' value={fetchedUser.last_name}/>
          <TextField sx={{ mt: 1 }} variant='outlined' label='Email' value={fetchedUser.email} />
          <TextField sx={{ mt: 1 }} variant='outlined' label='User ID' value={fetchedUser.id} disabled/>
          { adminControls && <FormControlLabel control={<Checkbox />} 
          label='Admin Privilages'/>}
        </FormGroup>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button sx={{ mr: 1 }} variant="contained" color="secondary" 
        onClick={() => alert(userId)}>Save</Button>
        <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
      </Box>
      </Box>
    </Modal>
      </React.Fragment>
      )
}

export default EditModal;