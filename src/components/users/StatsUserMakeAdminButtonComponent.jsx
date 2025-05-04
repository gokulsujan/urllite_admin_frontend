import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import api from '../utils/axios';
import { useSnackbar } from '../commons/SnackbarComponent';


const deleteModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '80%',
        sm: '60%',
        md: '30%',
    },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const StatsUserMakeAdminButtonComponent = ({ userID }) => {
    const [open, setOpen] = useState(false);
    const [makingAdmin, setMakingAdmin] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showSnackbar = useSnackbar();

    const handleMakeAdmin = async () => {
        setMakingAdmin(true)
        try {
            let response = await api.post("/api/v1/user/" + userID + "/make-admin", {}, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 202) {
                showSnackbar("Admin privilage given to the user", "success", "bottom", "right")
            } else {
                showSnackbar(response.data.message, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        } finally {
            { userID }
            setMakingAdmin(false)
            handleClose()
        }
    }


    return (
        <>
            <Button variant="outlined" size="small" color="success" onClick={handleOpen} startIcon={<AdminPanelSettings />}>Make Admin</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={deleteModalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Confirm making admin
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Are you sure you want to make this user as admin?
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleMakeAdmin}
                            variant="contained"
                            color="success"
                            disabled={makingAdmin}
                            startIcon={makingAdmin && <CircularProgress size={20} color="inherit" />}
                        >
                            {makingAdmin ? 'Making Admin' : 'Make Admin'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default StatsUserMakeAdminButtonComponent;
