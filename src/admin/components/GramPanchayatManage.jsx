import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data
const gramPanchayats = [
  { id: 1, name: 'Koregaon', taluka: 'Haveli', population: 5000, sarpanch: 'Ramesh Patil' },
  { id: 2, name: 'Wagholi', taluka: 'Haveli', population: 12000, sarpanch: 'Suresh More' },
  { id: 3, name: 'Lonikand', taluka: 'Haveli', population: 8500, sarpanch: 'Geeta Shinde' },
];

const GramPanchayatManage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Manage Gram Panchayats</Typography>
        <Typography variant="h6">Total: {gramPanchayats.length}</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>GP Name</TableCell>
              <TableCell>Taluka</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Sarpanch</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gramPanchayats.map((gp) => (
              <TableRow key={gp.id}>
                <TableCell>{gp.id}</TableCell>
                <TableCell>{gp.name}</TableCell>
                <TableCell>{gp.taluka}</TableCell>
                <TableCell>{gp.population}</TableCell>
                <TableCell>{gp.sarpanch}</TableCell>
                <TableCell align="right">
                  <IconButton><EditIcon /></IconButton>
                  <IconButton><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GramPanchayatManage;
