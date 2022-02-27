import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Container>
      <Grid container justifyContent='center'>
        <Grid item sx={{ margin: '100px 0'}}>
          <Typography variant='h1'>UNAUTHORIZED</Typography>
        </Grid>
        <Grid container justifyContent='center'>
          <Button href='/' variant='contained'>Go Home</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Unauthorized