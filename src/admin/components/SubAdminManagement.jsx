import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const subAdmins = [
  { id: 1, name: 'Vikram Singh', email: 'vikram@example.com', permissions: 'Manage Notices' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', permissions: 'Manage Events, Gallery' },
];

const SubAdminManagement = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Manage Sub-Admins</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />}>
          Create Sub-Admin
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.permissions}</TableCell>
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

export default SubAdminManagement;