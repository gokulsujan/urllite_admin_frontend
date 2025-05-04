import {
    Button,
    Card,
    CardContent,
    MenuItem,
    Select,
    TextField,
    Typography,
    InputLabel,
    FormControl,
    FormHelperText,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Updated import for React Router v6
import api from "../utils/axios";
import { useSnackbar } from "../commons/SnackbarComponent";

const UserEditComponent = () => {
    const { userID } = useParams(); // Get userID from URL param
    const navigate = useNavigate(); // Replacing useHistory with useNavigate in React Router v6
    const [user, setUser] = useState({ name: '', email: '', mobile: '', status: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const showSnackbar = useSnackbar()

    // Fetch the user data based on the ID from the URL
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/v1/user/${userID}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                });
                if (response.status === 200) {
                    setUser(response.data.result);
                } else {
                    showSnackbar("Failed to fetch user data.", "error", "bottom", "right")
                    navigate(`/user/${userID}`);
                }
            } catch (error) {
                showSnackbar("Failed to fetch user data.", "error", "bottom", "right")
                navigate(`/user/${userID}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [userID]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/v1/user/${userID}`, user, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
            });
            if (response.status === 202) {
                showSnackbar(response.data.message, "success", "bottom", "right")
                navigate(`/user/${userID}`)
            } else {
                showSnackbar("Failed to update user data: " + response.data.message, "error", "bottom", "right")
                navigate(`/user/${userID}`);
            }
        } catch (error) {
            showSnackbar("Failed to update user data: " + error, "error", "bottom", "right")
            navigate(`/user/${userID}`);
        }
    };

    return (
        <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Edit User
                </Typography>
                {isLoading ? (
                    <Typography variant="body2">Loading...</Typography>
                ) : error ? (
                    <Typography variant="body2" color="error">{error}</Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            label="Mobile"
                            name="mobile"
                            value={user.mobile}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                        />

                        {/* Status Dropdown */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                label="Status"
                                name="status"
                                value={user.status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="suspended">Suspended</MenuItem>
                            </Select>
                            <FormHelperText>Status of the user</FormHelperText>
                        </FormControl>

                        {/* Role Dropdown */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                required
                                disabled
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                            <FormHelperText>Role of the user</FormHelperText>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};

export default UserEditComponent;
