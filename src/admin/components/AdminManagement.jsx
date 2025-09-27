import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { db, auth } from '../../firebaseConfig'; // Import auth
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword

const AdminForm = ({ onSave, onCancel, admin }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
    };
    if (!admin) {
      formData.password = data.get('password');
    }
    onSave(formData);
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {admin ? 'Edit Admin' : 'Add New Admin'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="name" required fullWidth label="Name" defaultValue={admin ? admin.name : ''} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="email" required fullWidth label="Email" type="email" defaultValue={admin ? admin.email : ''} />
          </Grid>
          {!admin && (
            <Grid item xs={12}>
              <TextField name="password" required fullWidth label="Password" type="password" />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField name="role" required fullWidth label="Role" helperText="e.g., Super Admin, Admin" defaultValue={admin ? admin.role : ''} />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={onCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const adminsCollectionRef = collection(db, "admins");

  const getAdmins = async () => {
    const data = await getDocs(adminsCollectionRef);
    setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAdmins();
  }, []);


  const handleAddAdmin = () => {
    setShowAddForm(true);
    setEditingAdmin(null);
  };

  const handleEditAdmin = (admin) => {
    if (admin.role === 'Super Admin') {
      alert("Cannot edit Super Admin.");
      return;
    }
    setEditingAdmin(admin);
    setShowAddForm(false);
  };

  const handleDeleteAdmin = (admin) => {
    if (admin.role === 'Super Admin') {
      alert("Cannot delete Super Admin.");
      return;
    }
    setDeletingAdmin(admin);
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "admins", deletingAdmin.id));
    getAdmins();
    setDeletingAdmin(null);
  };


  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAdmin(null);
  };

  const handleSaveAdmin = async (formData) => {
    if (editingAdmin) {
      const adminDoc = doc(db, "admins", editingAdmin.id);
      await updateDoc(adminDoc, formData);
      alert('Admin updated!');
    } else {
      try {
        // Create user in Firebase Authentication
        const { email, password, ...adminData } = formData;
        await createUserWithEmailAndPassword(auth, email, password);

        // Add user to Firestore
        await addDoc(adminsCollectionRef, { email, ...adminData });
        alert('New admin added!');
      } catch (error) {
        alert('Error creating admin: ' + error.message);
      }
    }
    getAdmins();
    handleCancel();
  };


  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Manage Admins</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleAddAdmin}>
          Create Admin
        </Button>
      </Box>

      {showAddForm && <AdminForm onSave={handleSaveAdmin} onCancel={handleCancel} />}
      {editingAdmin && <AdminForm onSave={handleSaveAdmin} onCancel={handleCancel} admin={editingAdmin} />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditAdmin(admin)} disabled={admin.role === 'Super Admin'}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteAdmin(admin)} disabled={admin.role === 'Super Admin'}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingAdmin}
        onClose={() => setDeletingAdmin(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the admin "{deletingAdmin?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletingAdmin(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminManagement;