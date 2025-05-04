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
import { Block, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { useSnackbar } from '../commons/SnackbarComponent';


const activeModalStyle = {
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

const ActiveButtonComponent = ({ userID, onStatusChange, index }) => {
    const [open, setOpen] = useState(false);
    const [activating, setActivating] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();

    const handleSuspend = async () => {
        setActivating(true)
        try {
            let response = await api.put("/api/v1/user/" + userID, { status: "active" }, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
            })

            if (response.status == 202) {
                onStatusChange(index, 'active');
                showSnackbar("User is activated", "success", "bottom", "right")
                handleClose()
            } else {
                showSnackbar(response.data.message, "error", "bottom", "right")
            }
        } catch (error) {
            showSnackbar(error?.response?.data || "Something went wrong", "error", "bottom", "right")
        } finally {
            setActivating(false)
        }
    }


    return (
        <>
            <Tooltip title="Acivate User">
                <IconButton onClick={handleOpen}>
                    <CheckCircle color="success" />
                </IconButton>
            </Tooltip>

            <Modal open={open} onClose={handleClose}>
                <Box sx={activeModalStyle}>
                    <Typography variant="h6" gutterBottom>
                        Confirm activating user
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Are you sure you want to activate this user?
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSuspend}
                            variant="contained"
                            color="success"
                            disabled={activating}
                            startIcon={activating && <CircularProgress size={20} color="inherit" />}
                        >
                            {activating ? 'Activating' : 'Activate'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ActiveButtonComponent;
