import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import { AdminPanelSettings, RemoveModerator } from '@mui/icons-material';
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

const StatsUserRemoveAdminButtonComponent = ({ userID }) => {
    const [open, setOpen] = useState(false);
    const [removingAdmin, setRemovingAdmin] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showSnackbar = useSnackbar();

    const handleRemoveAdmin = async () => {
        setRemovingAdmin(true)
        try {
            let response = await api.put("/api/v1/user/" + userID, { role: "user" }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 202) {
                showSnackbar("Admin privilage removed the user", "info", "bottom", "right")
            } else {
                showSnackbar(response.data.message, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        } finally {
            { userID }
            setRemovingAdmin(false)
            handleClose()
        }
    }


    return (
        <>
            <Button variant="outlined" size="small" color="secondary" onClick={handleOpen} startIcon={<RemoveModerator />}>Remove Admin</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={deleteModalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Confirm removing admin
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Are you sure you want to remove this user from admin privilages?
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRemoveAdmin}
                            variant="contained"
                            color="success"
                            disabled={removingAdmin}
                            startIcon={removingAdmin && <CircularProgress size={20} color="inherit" />}
                        >
                            {removingAdmin ? 'Making Admin' : 'Make Admin'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default StatsUserRemoveAdminButtonComponent;
