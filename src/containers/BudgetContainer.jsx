import React from 'react';
import { Grid, Box, Card, CardContent, Typography, TextField, Checkbox } from '@mui/material';

const BudgetContainer = () => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Budget
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Min/Max Price Range</Typography>
              <TextField label="Min" variant="outlined" margin="normal" fullWidth />
              <TextField label="Max" variant="outlined" margin="normal" fullWidth />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Range Filter</Typography>
              <Checkbox /> only show trips in this range
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Budget Details</Typography>
              <TextField label="Hotel" variant="outlined" margin="normal" fullWidth />
              <TextField label="Dining" variant="outlined" margin="normal" fullWidth />
              <TextField label="Transportation" variant="outlined" margin="normal" fullWidth />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BudgetContainer;
