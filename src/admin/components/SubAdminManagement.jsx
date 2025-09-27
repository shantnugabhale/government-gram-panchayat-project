import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { db, auth } from '../../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SubAdminForm = ({ onSave, onCancel, subAdmin }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get('firstName'),
      middleName: data.get('middleName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      district: data.get('district'),
      taluka: data.get('taluka'),
      gramPanchayat: data.get('gramPanchayat'),
    };
     if (!subAdmin) {
      formData.password = data.get('password');
    }
    onSave(formData);
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {subAdmin ? 'Edit Sub-Admin' : 'Add New Sub-Admin'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField name="firstName" required fullWidth label="First Name" defaultValue={subAdmin ? subAdmin.firstName : ''} /></Grid>
          <Grid item xs={12} sm={4}><TextField name="middleName" fullWidth label="Middle Name" defaultValue={subAdmin ? subAdmin.middleName : ''} /></Grid>
          <Grid item xs={12} sm={4}><TextField name="lastName" required fullWidth label="Last Name" defaultValue={subAdmin ? subAdmin.lastName : ''} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="email" required fullWidth label="Email Address" type="email" defaultValue={subAdmin ? subAdmin.email : ''} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="phone" required fullWidth label="Phone Number" type="tel" defaultValue={subAdmin ? subAdmin.phone : ''} /></Grid>
           {!subAdmin && (
            <Grid item xs={12}>
              <TextField name="password" required fullWidth label="Password" type="password" />
            </Grid>
          )}
          <Grid item xs={12} sm={4}><TextField name="district" required fullWidth label="District" defaultValue={subAdmin ? subAdmin.district : ''} /></Grid>
          <Grid item xs={12} sm={4}><TextField name="taluka" required fullWidth label="Taluka" defaultValue={subAdmin ? subAdmin.taluka : ''} /></Grid>
          <Grid item xs={12} sm={4}><TextField name="gramPanchayat" required fullWidth label="Gram Panchayat" defaultValue={subAdmin ? subAdmin.gramPanchayat : ''} /></Grid>
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


const SubAdminManagement = () => {
    const [subAdmins, setSubAdmins] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSubAdmin, setEditingSubAdmin] = useState(null);
    const [deletingSubAdmin, setDeletingSubAdmin] = useState(null);
    const subAdminsCollectionRef = collection(db, "subAdmins");

    const getSubAdmins = async () => {
        const data = await getDocs(subAdminsCollectionRef);
        setSubAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getSubAdmins();
    }, []);

  const handleAddSubAdmin = () => {
    setShowAddForm(true);
    setEditingSubAdmin(null);
  };

  const handleEditSubAdmin = (subAdmin) => {
    setEditingSubAdmin(subAdmin);
    setShowAddForm(false);
  };

  const handleDeleteSubAdmin = (subAdmin) => {
    setDeletingSubAdmin(subAdmin);
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "subAdmins", deletingSubAdmin.id));
    alert('Sub-admin deleted from database. Please manually delete the user from Firebase Authentication as well.');
    getSubAdmins();
    setDeletingSubAdmin(null);
  };


  const handleCancel = () => {
    setShowAddForm(false);
    setEditingSubAdmin(null);
  };

  const handleSaveSubAdmin = async (formData) => {
    if (editingSubAdmin) {
      const subAdminDoc = doc(db, "subAdmins", editingSubAdmin.id);
      await updateDoc(subAdminDoc, formData);
      alert('Sub-admin updated!');
    } else {
        try {
            const { email, password, ...subAdminData } = formData;
            await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(subAdminsCollectionRef, { email, ...subAdminData });
            alert('New sub-admin added!');
        } catch (error) {
            alert('Error creating sub-admin: ' + error.message);
        }
    }
    getSubAdmins();
    handleCancel();
  };


  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Manage Sub-Admins</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleAddSubAdmin}>
          Create Sub-Admin
        </Button>
      </Box>

      {showAddForm && <SubAdminForm onSave={handleSaveSubAdmin} onCancel={handleCancel} />}
      {editingSubAdmin && <SubAdminForm onSave={handleSaveSubAdmin} onCancel={handleCancel} subAdmin={editingSubAdmin} />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Taluka</TableCell>
              <TableCell>Gram Panchayat</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{`${admin.firstName} ${admin.middleName || ''} ${admin.lastName}`}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phone}</TableCell>
                <TableCell>{admin.district}</TableCell>
                <TableCell>{admin.taluka}</TableCell>
                <TableCell>{admin.gramPanchayat}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditSubAdmin(admin)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteSubAdmin(admin)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       {/* Delete Confirmation Dialog */}
       <Dialog
        open={!!deletingSubAdmin}
        onClose={() => setDeletingSubAdmin(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the sub-admin "{`${deletingSubAdmin?.firstName} ${deletingSubAdmin?.lastName}`}"? This will only remove them from the sub-admin list, not from Firebase Authentication.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletingSubAdmin(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SubAdminManagement;