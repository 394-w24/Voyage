import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PreferencesCard from '../components/PreferencesCard/PreferencesCard';

const PreferencesContainer = ({ preferences }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Preferences
      </Typography>
      <Grid container spacing={3}>
        {preferences.map((preference, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PreferencesCard preference={preference} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PreferencesContainer;
