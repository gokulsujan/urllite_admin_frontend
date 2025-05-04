import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Tooltip,
    Modal,
    Box,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import { Block } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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

const StatsUserSuspendButtonComponent = ({ userID }) => {
    const [open, setOpen] = useState(false);
    const [suspending, setSuspending] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();

    const handleSuspend = async () => {
        setSuspending(true)
        try {
            let response = await api.put("/api/v1/user/" + userID, { status: "suspended" }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 202) {
                showSnackbar("User is suspended", "info", "bottom", "right")
            } else {
                showSnackbar(response.data.message, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        } finally {
            { userID }
            setSuspending(false)
            handleClose()
        }
    }


    return (
        <>
            <Button variant="outlined" size="small" color="error" onClick={handleOpen} startIcon={<Block />}>Suspend</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={deleteModalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Confirm Suspending user
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Are you sure you want to suspend this user?
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSuspend}
                            variant="contained"
                            color="error"
                            disabled={suspending}
                            startIcon={suspending && <CircularProgress size={20} color="inherit" />}
                        >
                            {suspending ? 'Suspending' : 'Suspend'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default StatsUserSuspendButtonComponent;
