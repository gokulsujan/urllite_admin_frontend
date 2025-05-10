import {
    Edit,
    Person,
    Security,
    MailOutline,
    WhatsApp,
    Call,
    Verified,
    Cancel
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
    IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import StatsUserSuspendButtonComponent from "./StatsUserSuspendButtonComponent ";
import StatsUserActivateButtonComponent from "./StatsUserActivateButtonComponent ";
import StatsUserMakeAdminButtonComponent from "./StatsUserMakeAdminButtonComponent";
import StatsUserRemoveAdminButtonComponent from "./StatsUserRemoveAdminButtonComponent";
import { useSnackbar } from "../commons/SnackbarComponent";

export const UserProfileCardComponent = ({ userID, setStatus }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const showSnackbar = useSnackbar()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/api/v1/user/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (response.status === 200) {
                    setUser(response.data.result);
                } else {
                    console.error("Failed to fetch user");
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userID]);

    return (
        <Card
            sx={{
                p: 2,
                mb: 4,
                boxShadow: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2
            }}
        >
            {/* User Info Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isLoading ? (
                    <Skeleton variant="circular" width={72} height={72} sx={{ mr: 3 }} />
                ) : (
                    <Avatar sx={{ width: 72, height: 72, mr: 3 }}>
                        <Person />
                    </Avatar>
                )}

                <CardContent sx={{ px: 0 }}>
                    <Typography variant="h6">
                        {isLoading ? <Skeleton width={120} /> : user.name}
                    </Typography>

                    {/* Icons for Email, WhatsApp, Call */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                        {isLoading ? (
                            <Skeleton width={100} />
                        ) : (
                            <>
                                <Tooltip title={`Send Email to ${user.email}`}>
                                    <IconButton color="primary" onClick={() => window.location.href = `mailto:${user.email}`}>
                                        <MailOutline fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={`Send WhatsApp to ${user.mobile}`}>
                                    <IconButton color="success" onClick={() => wUserProfileCardComponentindow.open(`https://wa.me/${user.mobile}`, '_blank')}>
                                        <WhatsApp fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={`Call ${user.mobile}`}>
                                    <IconButton color="primary" onClick={() => window.open(`tel:${user.mobile}`, '_blank')}>
                                        <Call fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Box>

                    {/* Role and Status Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {isLoading ? (
                            <Skeleton width={80} />
                        ) : (
                            user.role === 'admin' && (
                                <Tooltip title="Admin">
                                    <Security color="warning" sx={{ mr: 1 }} />
                                </Tooltip>
                            )
                        )}

                        {/* Status and Verification */}
                        {isLoading ? (
                            <Skeleton width={100} />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip
                                    label={user.status === 'active' ? "Active" : "Suspended"}
                                    color={user.status === 'active' ? "success" : "error"}
                                    size="small"
                                    sx={{ mr: 1 }}
                                />
                                {user.email && user.verified_email && user.email === user.verified_email ? (
                                    <Tooltip title="Verified User">
                                        <IconButton color="success" sx={{ ml: 1 }}>
                                            <Verified />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Not Verified User">
                                        <IconButton color="error" sx={{ ml: 1 }}>
                                            <Cancel />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Box>

            {/* Action Buttons */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 2, sm: 0 } }}
            >
                {isLoading ? (
                    <>
                        <Skeleton variant="rounded" height={36} width={90} />
                        <Skeleton variant="rounded" height={36} width={100} />
                        <Skeleton variant="rounded" height={36} width={130} />
                    </>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/user/${user.id}/edit`)}
                            startIcon={<Edit />}
                        >
                            Edit
                        </Button>

                        {user.status === 'active' ? (
                            <StatsUserSuspendButtonComponent userID={user.id} />
                        ) : (
                            <StatsUserActivateButtonComponent userID={user.id} />
                        )}

                        {user.role === 'user' ? (
                            <StatsUserMakeAdminButtonComponent userID={user.id} />
                        ) : (
                            <StatsUserRemoveAdminButtonComponent userID={user.id} />
                        )}
                    </>
                )}
            </Stack>
        </Card>
    );
};
