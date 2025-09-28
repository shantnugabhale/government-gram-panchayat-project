import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Alert } from '@mui/material';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const SubAdminProfile = () => {
    const [user, loadingAuth] = useAuthState(auth);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const subAdminsRef = collection(db, "subAdmins");
                    const q = query(subAdminsRef, where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const profileDoc = querySnapshot.docs[0];
                        setProfile(profileDoc.data());
                    } else {
                        setError("Sub-admin profile not found.");
                    }
                } catch (err) {
                    setError("Failed to fetch profile data.");
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        if (!loadingAuth) {
            fetchProfile();
        }
    }, [user, loadingAuth]);

    if (loadingAuth || isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>My Profile</Typography>
            {profile && (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">Name:</Typography>
                        <Typography variant="h6">{`${profile.firstName || ''} ${profile.middleName || ''} ${profile.lastName || ''}`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">Email Address:</Typography>
                        <Typography variant="h6">{profile.email || ''}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">Phone Number:</Typography>
                        <Typography variant="h6">{profile.phone || ''}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">District:</Typography>
                        <Typography variant="h6">{profile.district || ''}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">Taluka:</Typography>
                        <Typography variant="h6">{profile.taluka || ''}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">Gram Panchayat:</Typography>
                        <Typography variant="h6">{profile.gramPanchayat || ''}</Typography>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

export default SubAdminProfile;