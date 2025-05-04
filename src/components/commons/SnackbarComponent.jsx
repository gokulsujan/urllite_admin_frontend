import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';

const SnackbarContext = createContext();

export const SnackbarComponent = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const [anchorOrigin, setAnchorOrigin] = useState({
        vertical: 'bottom',
        horizontal: 'center',
    });

    const showSnackbar = (message, severity = 'info', vertical = 'bottom', horizontal = 'center') => {
        setSnackbar({ open: true, message, severity });
        setAnchorOrigin({ vertical, horizontal });
    };

    const handleClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}  // Set auto close after 5 seconds
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}  // Apply slide-up transition
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarComponent');
    }
    return context.showSnackbar;
};
