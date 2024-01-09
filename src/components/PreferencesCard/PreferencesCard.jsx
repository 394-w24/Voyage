import React from 'react';
import { Card, CardContent, Checkbox, Box, Typography } from '@mui/material';

const PreferencesCard = ({ preference }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" alignItems="center">
            {preference.icon}
            <Checkbox />
          </Box>
          <Typography variant="subtitle1">{preference.label}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PreferencesCard;
