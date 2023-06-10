import React from 'react';
import { Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' align='center' gutterBottom>
        Welcome to the Restaurant App
      </Typography>
      <Typography variant='body1' align='center'>
        This is the homepage of our application.
      </Typography>
      {/* Add more content or components as needed */}
    </Container>
  );
};

export default HomePage;
